const convertEtherToWei = require("../../../convertEtherToWei");
const ContractInstances = require("../../ContractInstances");
const { expect } = require("chai");

const SellToAuction = () => {
  let addr1;
  let ERC721TokenHardhat;
  let ERC20TokenHardhat;
  let AuctionHardhat;

  beforeEach(async () => {
    ({ addr1, ERC20TokenHardhat, AuctionHardhat, ERC721TokenHardhat } =
      await ContractInstances());
  });
  it("Minting Nft", async () => {
    const data = await AuctionHardhat.connect(addr1).sellToAuctionWithToken(
      "Achyut",
      ERC20TokenHardhat.address,
      "achyut",
      convertEtherToWei("10"),
      86400
    );
    await data.wait();
    expect(await ERC721TokenHardhat.ownerOf(1)).to.equal(
      AuctionHardhat.address
    );
  });
  it("Minting Nft > Struct and events should be updated For token", async () => {
    const data = await AuctionHardhat.connect(addr1).sellToAuctionWithToken(
      "Achyut",
      ERC20TokenHardhat.address,
      "achyut",
      convertEtherToWei("10"),
      86400
    );
    const result = await data.wait();

    const events = result.events[1].args;
    const res = await AuctionHardhat.getAuctionDetails(1);

    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;

    // Struct
    expect(res.startingPrice).to.equal(convertEtherToWei("10"));
    expect(res.auctionMaker).to.equal(addr1.address);
    expect(res.eth).to.equal(false);
    expect(res.name).to.equal("achyut");
    expect(res.EndingDate).to.equal(timestampBefore + 86400);
    expect(res.tokenAddress).to.equal(ERC20TokenHardhat.address);

    // Events
    expect(events.auctioner).to.equal(addr1.address);
    expect(events.minimum_Price).to.equal(convertEtherToWei("10"));
    expect(events.Token_id).to.equal("1");
    expect(events.ending_Date).to.equal(timestampBefore + 86400);
  });
  it("Minting Nft > Struct and events should be updated For Ether", async () => {
    // await AuctionHardhat.connect(addr1

    const data = await AuctionHardhat.connect(addr1).sellToAuctionWithEth(
      "Achyut",
      "achyut",
      convertEtherToWei("10"),
      86400
    );
    const result = await data.wait();
    const events = result.events[1].args;

    const res = await AuctionHardhat.getAuctionDetails(1);

    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;

    // Struct
    expect(res.startingPrice).to.equal(convertEtherToWei("10"));
    expect(res.auctionMaker).to.equal(addr1.address);
    expect(res.eth).to.equal(true);
    expect(res.EndingDate).to.equal(timestampBefore + 86400);

    //Events;
    expect(events.auctioner).to.equal(addr1.address);
    expect(events.minimum_Price).to.equal(convertEtherToWei("10"));
    expect(events.Token_id).to.equal("1");
    expect(events.ending_Date).to.equal(timestampBefore + 86400);
  });
};

module.exports = SellToAuction;
