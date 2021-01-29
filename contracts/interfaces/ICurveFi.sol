// SPDX-License-Identifier: MIT

pragma solidity ^0.5.16;

interface ICurveFi {

  function get_virtual_price() external view returns (uint);
  function totalSupply() external view returns (uint);
}
