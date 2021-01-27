pragma solidity ^0.5.16;

import "./CTokenInterfaces.sol";

interface PriceOracleInterface {
    /// @notice Indicator that this is a PriceOracle contract (for inspection)
    // bool public constant isPriceOracle = true;

    function isPriceOracle() external view returns (bool);
    /**
      * @notice Get the underlying price of a cToken asset
      * @param cToken The cToken to get the underlying price of
      * @return The underlying asset price mantissa (scaled by 1e18).
      *  Zero means the price is unavailable.
      */
    function getUnderlyingPrice(CTokenInterface cToken) external view returns (uint);
}
