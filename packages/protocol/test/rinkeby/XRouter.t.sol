// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import {XRouterTestsSuite} from "../XRouterTestsSuite.sol";

contract XRouterTest is XRouterTestsSuite {
  function setUp() public {
    vm.selectFork(rinkebyFork);
    deploy(1111);
  }
}
