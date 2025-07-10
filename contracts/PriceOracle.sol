// contracts/PriceOracle.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PriceOracle {
    mapping(address => uint256) public prices; // token => price in USD (1e18)

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setPrice(address token, uint256 priceInUSD) external {
        require(msg.sender == owner, "Not authorized");
        prices[token] = priceInUSD;
    }

    function getPrice(address token) external view returns (uint256) {
        return prices[token];
    }
}
