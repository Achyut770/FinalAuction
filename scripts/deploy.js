// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  [owner, addr1, addr2, addr3] = await ethers.getSigners();
  ERC721Token = await ethers.getContractFactory("ERC721Token");
  Auction = await ethers.getContractFactory("Auction");
  ERC20 = await ethers.getContractFactory("ERC20");
  ERC20Tokenhardhat = await ERC721Token.deploy();
  await ERC20Tokenhardhat.deployed();

  ERC721TokenHardhat = await ERC721Token.deploy();
  await ERC721TokenHardhat.deployed();
  AuctionHardhat = await Auction.deploy(
    ERC721TokenHardhat.address,
    ERC20Tokenhardhat.address
  );
  await AuctionHardhat.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
