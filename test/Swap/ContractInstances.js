const convertEtherToWei = require("../convertEtherToWei");

const ContractInstances = async () => {
  [owner, addr1, addr2, addr3] = await ethers.getSigners();

  ERC20Token = await ethers.getContractFactory("ERC20Token");
  ERC20TokenHardhat = await ERC20Token.deploy("10000");
  await ERC20TokenHardhat.deployed();

  ERC20Swap = await ethers.getContractFactory("ERC20Swap");
  ERC20SwapHardhat = await ERC20Swap.deploy(ERC20TokenHardhat.address);
  await ERC20SwapHardhat.deployed();
  return {
    owner,
    addr1,
    addr2,
    addr3,
    ERC20TokenHardhat,
    ERC20SwapHardhat,
  };
};

module.exports = ContractInstances;
