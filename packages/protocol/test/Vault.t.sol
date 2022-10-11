// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {DSTestPlus} from "./utils/DSTestPlus.sol";
import {SafeERC20} from "openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {MockERC20} from "../src/mocks/MockERC20.sol";
import {MockProvider} from "../src/mocks/MockProvider.sol";
import {MockOracle} from "../src/mocks/MockOracle.sol";
import {IVault} from "../src/interfaces/IVault.sol";
import {ILendingProvider} from "../src/interfaces/ILendingProvider.sol";
import {BorrowingVault} from "../src/vaults/borrowing/BorrowingVault.sol";

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

  function _utils_setupOracle(address asset1, address asset2) internal {
    // WETH and DAI prices by Aug 12h 2022
    vm.mockCall(
      address(oracle),
      abi.encodeWithSelector(MockOracle.getPriceOf.selector, asset1, asset2, 18),
      abi.encode(528881643782407)
    );
    vm.mockCall(
      address(oracle),
      abi.encodeWithSelector(MockOracle.getPriceOf.selector, asset2, asset1, 18),
      abi.encode(1889069940262927605990)
    );
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
  )
    internal
  {
    _utils_doDeposit(depositAmount, v, who);
    vm.prank(who);
    v.borrow(borrowAmount, who, who);
  }

  function _utils_setMinDeposit(uint256 newMinAmount) internal {
    vm.expectEmit(true, false, false, false);
    emit MinDepositAmountChanged(newMinAmount);
    vault.setMinDepositAmount(newMinAmount);
  }

  function _utils_setDepositCap(uint256 newMaxCap) internal {
    vm.expectEmit(true, false, false, false);
    emit DepositCapChanged(newMaxCap);
    vault.setDepositCap(newMaxCap);
  }

  //fuzz testing example
  function test_deposit(uint256 amount) public {
    _utils_doDeposit(amount, vault, alice);
    assertEq(vault.balanceOf(alice), amount);
  }

  function test_withdraw() public {
    uint256 amount = 2 ether;
    _utils_doDeposit(amount, vault, alice);

    vm.prank(alice);
    vault.withdraw(amount, alice, alice);

    assertEq(vault.balanceOf(alice), 0);
  }

  function test_depositAndBorrow() public {
    uint256 amount = 2 ether;
    uint256 borrowAmount = 100e18;

    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    assertEq(debtAsset.balanceOf(alice), borrowAmount);
  }

  function test_paybackAndWithdraw() public {
    uint256 amount = 2 ether;
    uint256 borrowAmount = 100e18;

    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    vm.startPrank(alice);
    SafeERC20.safeApprove(debtAsset, address(vault), borrowAmount);
    vault.payback(borrowAmount, alice);
    vault.withdraw(amount, alice, alice);
    vm.stopPrank();

    assertEq(vault.balanceOf(alice), 0);
  }

  function testFail_borrowWithoutCollateral() public {
    uint256 borrowAmount = 100e18;

    vm.prank(alice);
    vault.borrow(borrowAmount, alice, alice);
  }

  function testFail_withdrawWithoutRepay() public {
    uint256 amount = 2 ether;
    uint256 borrowAmount = 100e18;

    _utils_doDepositAndBorrow(amount, borrowAmount, vault, alice);

    vm.prank(alice);
    vault.withdraw(amount, alice, alice);
  }

  function test_setMinDeposit() public {
    uint256 mindeposit = 0.1 ether;
    _utils_setMinDeposit(mindeposit);
  }

  function testFail_tryMinDeposit() public {
    uint256 mindeposit = 0.1 ether;
    _utils_setMinDeposit(mindeposit);

    uint256 badDeposit = 0.05 ether;
    _utils_doDeposit(badDeposit, vault, alice);
  }

  function test_setMaxCap() public {
    uint256 maxCap = 5 ether;
    _utils_setDepositCap(maxCap);
  }

  function testFail_tryMaxCap() public {
    uint256 maxCap = 5 ether;
    _utils_setDepositCap(maxCap);

    uint256 depositAlice = 4.5 ether;
    _utils_doDeposit(depositAlice, vault, alice);

    uint256 depositBob = 1 ether;
    _utils_doDeposit(depositBob, vault, bob);
  }
}
