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

mini-aave/
├── contracts/ # Solidity smart contracts
├── test/ # Hardhat tests
├── scripts/ # Deployment & utility scripts
├── frontend/ # React app (Vite or CRA)
│ └── src/
│ ├── abis/
│ ├── components/
│ └── App.js
├── hardhat.config.js
└── README.md

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