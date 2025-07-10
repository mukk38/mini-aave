# 🏦 Mini-Aave

A minimal decentralized lending protocol inspired by [Aave](https://aave.com/). Users can deposit ERC20 tokens as collateral and borrow other tokens in a trustless manner. Built with Solidity, Hardhat, and React.

---

## ✨ Features

- Deposit ERC20 tokens as collateral
- Borrow against your collateral (LTV enforced)
- Repay loans and free up collateral
- Simple dashboard showing wallet, balances and LTV
- React + Ethers.js frontend
- Unit tests with Hardhat

---

## 🛠️ Tech Stack

- Solidity (v0.8.x)
- Hardhat
- React.js
- Ethers.js
- OpenZeppelin Contracts

---

## 📁 Project Structure
```
mini-aave/
├── contracts/                  # Solidity smart contracts
│   ├── LendingPool.sol         # Main lending logic (deposit, borrow, repay)
│   ├── ERC20Mock.sol           # Mintable test token (DAI, USDC etc.)
│   └── PriceOracle.sol         # Manually settable price oracle
│
├── test/                       # Hardhat unit tests
│   └── LendingPool.test.js
│
├── scripts/                    # Deployment and utility scripts
│   ├── deploy.js               # Deploy contracts locally or to testnet
│   └── copyAbis.js             # Optional: copy compiled ABIs to frontend
│
├── frontend/                   # React + Ethers.js frontend
│   └── src/
│       ├── abis/               # Compiled contract ABIs
│       │   ├── LendingPool.json
│       │   └── ERC20Mock.json
│       │
│       ├── components/         # React components
│       │   └── Dashboard.js    # Shows wallet info, deposits, borrows, LTV
│       │
│       ├── App.js              # Main entry point
│       └── constants.js        # Contract addresses
│
├── .env                        # Environment variables (PRIVATE_KEY, INFURA_ID)
├── .gitignore
├── hardhat.config.js           # Hardhat configuration
├── package.json
└── README.md
```
```bash

---

## 🚀 Getting Started

### 🔧 Backend (Hardhat)

```bash
git clone https://github.com/yourusername/mini-aave
cd mini-aave
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to local network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost


```
