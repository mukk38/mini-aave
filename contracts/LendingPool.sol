// contracts/LendingPool.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PriceOracle.sol";

contract LendingPool {
    PriceOracle public oracle;
    address public owner;

    struct UserBalance {
        mapping(address => uint256) deposits;
        mapping(address => uint256) borrows;
    }

    mapping(address => UserBalance) internal balances;

    uint256 public constant LTV = 75; // %75 collateral usage
    uint256 public constant DECIMALS = 1e18;
    uint256 public constant INTEREST = 5; // %5 sabit faiz (örnek)

    constructor(address _oracle) {
        oracle = PriceOracle(_oracle);
        owner = msg.sender;
    }

    function deposit(address token, uint256 amount) external {
        require(amount > 0, "Invalid amount");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender].deposits[token] += amount;
    }

    function borrow(address token, uint256 amount) external {
        uint256 collateralValue = getCollateralValue(msg.sender);
        uint256 debtValue = getDebtValue(msg.sender);

        uint256 price = oracle.getPrice(token);
        require(price > 0, "Price not set");

        uint256 newDebtInUSD = (amount * price) / DECIMALS;

        require((debtValue + newDebtInUSD) * 100 <= collateralValue * LTV, "Insufficient collateral");

        balances[msg.sender].borrows[token] += amount;
        IERC20(token).transfer(msg.sender, amount);
    }

    function repay(address token, uint256 amount) external {
        require(amount > 0, "Invalid amount");

        balances[msg.sender].borrows[token] -= amount;
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    function getCollateralValue(address user) public view returns (uint256 totalInUSD) {
        for (uint i = 0; i < tokens.length; i++) {
            address token = tokens[i];
            uint256 amount = balances[user].deposits[token];
            uint256 price = oracle.prices(token);
            totalInUSD += (amount * price) / DECIMALS;
        }
    }

    function getDebtValue(address user) public view returns (uint256 totalInUSD) {
        for (uint i = 0; i < tokens.length; i++) {
            address token = tokens[i];
            uint256 amount = balances[user].borrows[token];
            uint256 price = oracle.prices(token);
            totalInUSD += (amount * price) / DECIMALS;
        }
    }

    address[] public tokens;

    function addSupportedToken(address token) external {
        require(msg.sender == owner, "Only owner");
        tokens.push(token);
    }
}
