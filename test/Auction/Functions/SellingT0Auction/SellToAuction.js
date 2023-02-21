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
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    await expect(
      AuctionHardhat.connect(owner).sellToAuctionWithToken(
        "Achyut",
        ERC20TokenHardhat.address,
        "achyut",
        convertEtherToWei("10"),
        86400
      )
    )
      .to.emit(AuctionHardhat, "soldAuctionWithToken")
      .withArgs(
        owner.address,
        convertEtherToWei("10"),
        1,
        timestampBefore + 86400 + 1,
        ERC20TokenHardhat.address
      );

    const res = await AuctionHardhat.getAuctionDetails(1);

    // Struct
    expect(res.startingPrice).to.equal(convertEtherToWei("10"));
    expect(res.auctionMaker).to.equal(owner.address);
    expect(res.eth).to.equal(false);
    expect(res.name).to.equal("achyut");
    expect(res.EndingDate).to.equal(timestampBefore + 86400 + 1);
    expect(res.tokenAddress).to.equal(ERC20TokenHardhat.address);
    expect(res.ended).to.equal(false);
    expect(res.started).to.equal(true);
  });
  it("Minting Nft > Struct and events should be updated For Ether", async () => {
    // await AuctionHardhat.connect(addr1
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    await expect(
      AuctionHardhat.connect(addr1).sellToAuctionWithEth(
        "Achyut",
        "achyut",
        convertEtherToWei("10"),
        86400
      )
    )
      .to.emit(AuctionHardhat, "soldAuctionWithEth")
      .withArgs(
        addr1.address,
        convertEtherToWei("10"),
        1,
        timestampBefore + 86400 + 1
      );

    const res = await AuctionHardhat.getAuctionDetails(1);

    // Struct
    expect(res.startingPrice).to.equal(convertEtherToWei("10"));
    expect(res.auctionMaker).to.equal(addr1.address);
    expect(res.eth).to.equal(true);
    expect(res.name).to.equal("achyut");
    expect(res.EndingDate).to.equal(timestampBefore + 86400 + 1);
    expect(res.ended).to.equal(false);
    expect(res.started).to.equal(true);
  });
};

module.exports = SellToAuction;
