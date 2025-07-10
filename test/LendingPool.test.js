const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LendingPool", function () {
  let deployer, user;
  let dai, usdc, oracle, pool;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    dai = await ERC20Mock.deploy("MiniDAI", "mDAI", ethers.utils.parseEther("1000000"));
    usdc = await ERC20Mock.deploy("MiniUSDC", "mUSDC", ethers.utils.parseEther("1000000"));

    const Oracle = await ethers.getContractFactory("PriceOracle");
    oracle = await Oracle.deploy();

    const Pool = await ethers.getContractFactory("LendingPool");
    pool = await Pool.deploy(oracle.address);

    await pool.addSupportedToken(dai.address);
    await pool.addSupportedToken(usdc.address);

    // Fiyatları USD cinsinden sabitle (1 mDAI = 1$, 1 mUSDC = 1$)
    await oracle.setPrice(dai.address, ethers.utils.parseEther("1"));
    await oracle.setPrice(usdc.address, ethers.utils.parseEther("1"));
  });

  it("Should allow deposit and update balance", async () => {
    await dai.connect(deployer).faucet(user.address, ethers.utils.parseEther("1000"));
    await dai.connect(user).approve(pool.address, ethers.utils.parseEther("1000"));

    await pool.connect(user).deposit(dai.address, ethers.utils.parseEther("500"));

    const balance = await dai.balanceOf(pool.address);
    expect(balance).to.equal(ethers.utils.parseEther("500"));
  });

  it("Should allow borrow within LTV", async () => {
    // Kullanıcı 1000 DAI yatırır → Collateral = 1000$
    await dai.connect(deployer).faucet(user.address, ethers.utils.parseEther("1000"));
    await dai.connect(user).approve(pool.address, ethers.utils.parseEther("1000"));
    await pool.connect(user).deposit(dai.address, ethers.utils.parseEther("1000"));

    // Pool'a USDC likidite ver
    await usdc.connect(deployer).approve(pool.address, ethers.utils.parseEther("1000"));
    await pool.connect(deployer).deposit(usdc.address, ethers.utils.parseEther("1000"));

    // Kullanıcı 750 USDC borç alabilir
    await pool.connect(user).borrow(usdc.address, ethers.utils.parseEther("750"));

    const usdcBalance = await usdc.balanceOf(user.address);
    expect(usdcBalance).to.equal(ethers.utils.parseEther("750"));
  });

  it("Should reject borrow beyond LTV", async () => {
    await dai.connect(deployer).faucet(user.address, ethers.utils.parseEther("1000"));
    await dai.connect(user).approve(pool.address, ethers.utils.parseEther("1000"));
    await pool.connect(user).deposit(dai.address, ethers.utils.parseEther("1000"));

    await usdc.connect(deployer).approve(pool.address, ethers.utils.parseEther("1000"));
    await pool.connect(deployer).deposit(usdc.address, ethers.utils.parseEther("1000"));

    // 800 USDC borç isteği LTV'yi aştığı için hata vermeli
    await expect(
      pool.connect(user).borrow(usdc.address, ethers.utils.parseEther("800"))
    ).to.be.revertedWith("Insufficient collateral");
  });
});
