// SPDX-License-Identifier: MIT

pragma solidity ^0.5.16;

interface IVault {
  function deposit(uint amount) external;
  function withdraw(uint shares) external;
  function balanceOf(address holder) external view returns (uint);
}
