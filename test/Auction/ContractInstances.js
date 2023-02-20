const convertEtherToWei = require("../convertEtherToWei");

const ContractInstances = async () => {
  [owner, addr1, addr2, addr3] = await ethers.getSigners();
  ERC721Token = await ethers.getContractFactory("ERC721Token");
  ERC20Token = await ethers.getContractFactory("ERC20Token");
  ERC721TokenHardhat = await ERC721Token.deploy();
  ERC20TokenHardhat = await ERC20Token.deploy(convertEtherToWei("10000"));
  Auction = await ethers.getContractFactory("Auction");
  AuctionHardhat = await Auction.deploy(ERC721TokenHardhat.address);
  await ERC721TokenHardhat.deployed();
  await ERC20TokenHardhat.deployed();
  await AuctionHardhat.deployed();
  return {
    owner,
    addr1,
    addr2,
    addr3,
    ERC721TokenHardhat,
    ERC20TokenHardhat,
    AuctionHardhat,
  };
};

module.exports = ContractInstances;
