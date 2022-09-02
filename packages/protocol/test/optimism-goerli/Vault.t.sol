// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {VaultTestsSuite} from "../VaultTestsSuite.sol";

contract VaultTest is VaultTestsSuite {
  function setUp() public {
    vm.selectFork(optimismGoerliFork);
    deploy(OPTIMISM_GOERLI_DOMAIN);
  }
}