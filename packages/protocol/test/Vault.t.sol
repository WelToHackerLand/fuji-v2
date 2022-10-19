// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/console.sol";
import {DSTestPlus} from "./utils/DSTestPlus.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";
import {MockProvider} from "../src/mocks/MockProvider.sol";
import {MockOracle} from "../src/mocks/MockOracle.sol";
import {IVault} from "../src/interfaces/IVault.sol";
import {ILendingProvider} from "../src/interfaces/ILendingProvider.sol";
import {BorrowingVault} from "../src/vaults/borrowing/BorrowingVault.sol";
import {BaseVault} from "../src/abstracts/BaseVault.sol";

contract VaultTest is DSTestPlus {
  event MinDepositAmountChanged(uint256 newMinDeposit);
  event DepositCapChanged(uint256 newDepositCap);

  IVault public vault;

  ILendingProvider public mockProvider;
  MockOracle public oracle;

  MockERC20 public asset;
  MockERC20 public debtAsset;

  uint256 alicePkey = 0xA;
  address alice = vm.addr(alicePkey);

  uint256 bobPkey = 0xB;
  address bob = vm.addr(bobPkey);

  function setUp() public {
    vm.label(alice, "Alice");
    vm.label(bob, "Bob");

    asset = new MockERC20("Test WETH", "tWETH");
    vm.label(address(asset), "tWETH");
    debtAsset = new MockERC20("Test DAI", "tDAI");
    vm.label(address(debtAsset), "tDAI");

    oracle = new MockOracle();
    _utils_setupOracle(address(asset), address(debtAsset));

    mockProvider = new MockProvider();

    vault = new BorrowingVault(
      address(asset),
      address(debtAsset),
      address(oracle),
      address(0),
      "Fuji-V2 WETH Vault Shares",
      "fv2WETH"
    );

    ILendingProvider[] memory providers = new ILendingProvider[](1);
    providers[0] = mockProvider;
    vault.setProviders(providers);
    vault.setActiveProvider(mockProvider);
  }

  function _utils_setPrice(address asset1, address asset2, uint256 price) internal {
    vm.mockCall(
      address(oracle),
      abi.encodeWithSelector(MockOracle.getPriceOf.selector, asset1, asset2, 18),
      abi.encode(price)
    );
  }

  function _utils_setupOracle(address asset1, address asset2) internal {
    // WETH and DAI prices: 2000 DAI/WETH
    _utils_setPrice(asset1, asset2, 5e14);
    _utils_setPrice(asset2, asset1, 2000e18);
  }

  function _utils_doDeposit(uint256 amount, IVault v, address who) internal {
    deal(address(asset), who, amount);

    vm.startPrank(who);
    SafeERC20.safeApprove(asset, address(v), amount);
    v.deposit(amount, who);
    vm.stopPrank();
  }

  function _utils_doDepositAndBorrow(
    uint256 depositAmount,
    uint256 borrowAmount,
    IVault v,
    address who
  ) internal {
    _utils_doDeposit(depositAmount, v, who);
    vm.prank(who);
    v.borrow(borrowAmount, who, who);
  }

  function _utils_checkMaxLTV(uint96 amount, uint96 borrowAmount) internal view returns (bool) {
    uint8 debtDecimals = 18;
    uint8 assetDecimals = 18;
    uint256 maxLtv = 75 * 1e16;

    uint256 price = oracle.getPriceOf(address(debtAsset), address(asset), debtDecimals);
    uint256 maxBorrow = (amount * maxLtv * price) / (1e18 * 10 ** assetDecimals);
    return borrowAmount < maxBorrow;
  }

  function _utils_getHealthFactor(uint96 amount, uint96 borrowAmount) internal view returns (uint256) {
    uint8 debtDecimals = 18;
    uint8 assetDecimals = 18;
    uint256 liqRatio = 80 * 1e16;

    uint256 price = oracle.getPriceOf(address(debtAsset), address(asset), debtDecimals);
    uint256 hf = ((amount * liqRatio * price) / (borrowAmount * 1e16 * 10 ** assetDecimals));
    return hf;
  }

  function _utils_getFutureHealthFactor(uint96 amount, uint96 borrowAmount, uint80 priceDrop) internal view returns (uint256) {
    uint256 hf_0 = _utils_getHealthFactor(amount, borrowAmount);
    uint8 debtDecimals = 18;

    uint256 priceBefore = oracle.getPriceOf(address(debtAsset), address(asset), debtDecimals);
    uint256 hf_1 = hf_0 * priceBefore / (priceBefore - priceDrop);
  
    return hf_1;
  }

  function _utils_add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a);
    require(c >= b);
    return c;
  }

  function _utils_multiply(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a * b;
    return c;
  }

  function test_deposit(uint256 amount) public {
    _utils_doDeposit(amount, vault, alice);
    assertEq(vault.balanceOf(alice), amount);
  }

  function test_withdraw(uint96 amount) public {
    vm.assume(amount > 0);
    _utils_doDeposit(amount, vault, alice);

    vm.prank(alice);
    vault.withdraw(amount, alice, alice);

    assertEq(vault.balanceOf(alice), 0);
  }

  function test_depositAndBorrow(uint96 amount, uint96 borrowAmount) public {
    vm.assume(amount > 0 && borrowAmount > 0 && _utils_checkMaxLTV(amount, borrowAmount));

    assertEq(vault.totalDebt(), 0);
    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    assertEq(vault.totalDebt(), borrowAmount);
    assertEq(debtAsset.balanceOf(alice), borrowAmount);
  }

  function test_paybackAndWithdraw(uint96 amount, uint96 borrowAmount) public {
    vm.assume(amount > 0 && borrowAmount > 0 && _utils_checkMaxLTV(amount, borrowAmount));

    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    vm.startPrank(alice);
    SafeERC20.safeApprove(debtAsset, address(vault), borrowAmount);
    assertEq(vault.totalDebt(), borrowAmount);
    vault.payback(borrowAmount, alice);
    assertEq(vault.totalDebt(), 0);
    vault.withdraw(amount, alice, alice);
    vm.stopPrank();

    assertEq(vault.balanceOf(alice), 0);
  }

  function test_tryBorrowWithoutCollateral(uint256 borrowAmount) public {
    vm.assume(borrowAmount > 0);
    vm.expectRevert(BorrowingVault.BorrowingVault__borrow_moreThanAllowed.selector);

    vm.prank(alice);
    vault.borrow(borrowAmount, alice, alice);
  }

  function test_tryWithdrawWithoutRepay(uint96 amount, uint96 borrowAmount) public {
    vm.assume(amount > 0 && borrowAmount > 0 && _utils_checkMaxLTV(amount, borrowAmount));
    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    vm.expectRevert(BaseVault.BaseVault__withdraw_moreThanMax.selector);

    vm.prank(alice);
    vault.withdraw(amount, alice, alice);
  }

  function test_setMinDeposit(uint256 min) public {
    vm.expectEmit(true, false, false, false);
    emit MinDepositAmountChanged(min);
    vault.setMinDepositAmount(min);
  }

  function test_tryLessThanMinDeposit(uint256 min, uint256 amount) public {
    vm.assume(amount < min);
    vault.setMinDepositAmount(min);

    vm.expectRevert(BaseVault.BaseVault__deposit_lessThanMin.selector);
    vm.prank(alice);
    vault.deposit(amount, alice);
  }

  function test_setMaxCap(uint256 maxCap) public {
    vm.assume(maxCap > 0);
    vm.expectEmit(true, false, false, false);
    emit DepositCapChanged(maxCap);
    vault.setDepositCap(maxCap);
  }

  function test_tryMaxCap(uint256 maxCap, uint96 depositAlice, uint96 depositBob) public {
    vm.assume(maxCap > 0 && depositAlice > 0 && depositBob > 0 && _utils_add(depositBob, depositAlice) > maxCap && depositAlice < maxCap);

    vault.setDepositCap(maxCap);
    _utils_doDeposit(depositAlice, vault, alice);

    vm.expectRevert(BaseVault.BaseVault__deposit_moreThanMax.selector);
    vm.prank(bob);
    vault.deposit(depositBob, bob);
  }

  function test_getHealthFactor(uint40 amount, uint40 borrowAmount) public {
    vm.assume(amount > 0 && borrowAmount > 0 && _utils_checkMaxLTV(amount, borrowAmount));
    
    uint256 HF = vault.getHealthFactor(alice); 
    assertEq(HF, type(uint256).max);

    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    uint256 HF2 = vault.getHealthFactor(alice);
    uint256 HF2_ = _utils_getHealthFactor(amount, borrowAmount) ;
    
    assertEq(HF2, HF2_);
  }

  // TODO FUZZ
  function test_getLiquidationFactor() public {
    uint256 liquidatorFactor_0 = vault.getLiquidationFactor(alice);
    assertEq(liquidatorFactor_0, 0);

    uint256 amount = 1 ether;
    uint256 borrowAmount = 1000e18;
    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    uint256 liquidatorFactor_1 = vault.getLiquidationFactor(alice);
    assertEq(liquidatorFactor_1, 0);

    _utils_setPrice(address(debtAsset), address(asset), 1225 * 1e18);

    uint256 liquidatorFactor_2 = vault.getLiquidationFactor(alice);
    assertEq(liquidatorFactor_2, 0.5e18);

    _utils_setPrice(address(debtAsset), address(asset), 1000 * 1e18);

    uint256 liquidatorFactor_3 = vault.getLiquidationFactor(alice);
    assertEq(liquidatorFactor_3, 1e18);
  }

  function test_tryLiquidateHealthy(uint96 amount, uint96 borrowAmount) public {
    vm.assume(amount > 0 && borrowAmount > 0 && _utils_checkMaxLTV(amount, borrowAmount));
    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    vm.expectRevert(BorrowingVault.BorrowingVault__liquidate_positionHealthy.selector);
    vm.prank(bob);
    vault.liquidate(alice, bob);
  }

  function test_liquidateMax(uint32 amount, uint32 borrowAmount, uint32 liquidatorAmount, uint8 priceDrop) public {
    vm.assume(amount > 0 && borrowAmount > 0 && _utils_checkMaxLTV(amount, borrowAmount) && priceDrop > 0 && liquidatorAmount > borrowAmount && _utils_getFutureHealthFactor(amount, borrowAmount, priceDrop)*100 <= 95 && _utils_getFutureHealthFactor(amount, borrowAmount, priceDrop) > 0 );

    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice); 

    // price drop 
    uint256 currentPrice = oracle.getPriceOf(address(asset), address(debtAsset), 18);
    uint256 price = currentPrice - priceDrop;
    _utils_setPrice(address(asset), address(debtAsset), price);
    _utils_setPrice(address(debtAsset), address(asset), 1e18 / price);
    deal(address(debtAsset), bob, liquidatorAmount);

    assertEq(asset.balanceOf(alice), 0);
    assertEq(debtAsset.balanceOf(alice), borrowAmount);
    assertEq(vault.balanceOf(alice), amount);
    assertEq(vault.balanceOfDebt(alice), borrowAmount);

    assertEq(asset.balanceOf(bob), 0);
    assertEq(debtAsset.balanceOf(bob), liquidatorAmount);
    assertEq(vault.balanceOf(bob), 0);
    assertEq(vault.balanceOfDebt(bob), 0);

    vm.startPrank(bob);
    SafeERC20.safeApprove(debtAsset, address(vault), liquidatorAmount);
    vault.liquidate(alice, bob);
    vm.stopPrank();

    assertEq(asset.balanceOf(alice), 0);
    assertEq(debtAsset.balanceOf(alice), borrowAmount);
    assertEq(vault.balanceOf(alice), 0);
    assertEq(vault.balanceOfDebt(alice), 0);

    assertEq(asset.balanceOf(bob), 0);
    assertEq(debtAsset.balanceOf(bob), liquidatorAmount - borrowAmount);
    assertEq(vault.balanceOf(bob), amount);
    assertEq(vault.balanceOfDebt(bob), 0);
  }

  // TODO FUZZ
  function test_liquidateDefault() public {
    uint256 amount = 1 ether;
    uint256 borrowAmount = 1000e18;
    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    // price drop, putting HF < 100, but above 95 and the close factor at 50%
    _utils_setPrice(address(asset), address(debtAsset), 806451612903226);
    _utils_setPrice(address(debtAsset), address(asset), 1240e18);
    uint256 liquidatorAmount = 2000e18;
    deal(address(debtAsset), bob, liquidatorAmount);

    assertEq(asset.balanceOf(alice), 0);
    assertEq(debtAsset.balanceOf(alice), borrowAmount);
    assertEq(vault.balanceOf(alice), amount);
    assertEq(vault.balanceOfDebt(alice), borrowAmount);

    assertEq(asset.balanceOf(bob), 0);
    assertEq(debtAsset.balanceOf(bob), liquidatorAmount);
    assertEq(vault.balanceOf(bob), 0);
    assertEq(vault.balanceOfDebt(bob), 0);

    vm.startPrank(bob);
    SafeERC20.safeApprove(debtAsset, address(vault), liquidatorAmount);
    vault.liquidate(alice, bob);
    vm.stopPrank();

    assertEq(asset.balanceOf(alice), 0);
    assertEq(debtAsset.balanceOf(alice), borrowAmount);
    assertEq(vault.balanceOf(alice), 551971326164874552);
    assertEq(vault.balanceOfDebt(alice), borrowAmount / 2);

    assertEq(asset.balanceOf(bob), 0);
    assertEq(debtAsset.balanceOf(bob), liquidatorAmount - borrowAmount / 2);
    assertEq(vault.balanceOf(bob), 448028673835125448);
    assertEq(vault.balanceOfDebt(bob), 0);
  }
}
