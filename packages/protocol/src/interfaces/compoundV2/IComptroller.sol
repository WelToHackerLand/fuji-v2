// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.15;

interface IComptroller {
  function enterMarkets(address[] calldata) external returns (uint256[] memory);

  function claimComp(address holder) external;
}
