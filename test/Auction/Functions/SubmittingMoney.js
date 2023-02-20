const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../ContractInstances");
const { expect } = require("chai");

const SubmitMoneyToWinner = () => {
  let addr1;
  let ERC721TokenHardhat;
  let AuctionHardhat;
  let ERC20TokenHardhat;

  beforeEach(async () => {
    ({
      addr1,
      ERC721TokenHardhat,
      ERC20TokenHardhat,
      AuctionHardhat,
      ERC721TokenHardhat,
    } = await ContractInstances());
    const data = await await AuctionHardhat.connect(
      addr1
    ).sellToAuctionWithToken(
      "Achyut",
      ERC20TokenHardhat.address,
      "achyut",
      convertEtherToWei("10"),
      86400
    );
    await data.wait();

    const datas = await AuctionHardhat.connect(addr1).sellToAuctionWithEth(
      "Achyut",
      "achyut",
      convertEtherToWei("10"),
      86400
    );
    await datas.wait();
    await ERC20TokenHardhat.connect(owner).transfer(
      addr1.address,
      convertEtherToWei("10")
    );
    await ERC20TokenHardhat.connect(owner).transfer(
      addr2.address,
      convertEtherToWei("10")
    );
    await ERC20TokenHardhat.connect(addr1).approve(
      AuctionHardhat.address,
      convertEtherToWei("10")
    );
    await ERC20TokenHardhat.connect(addr2).approve(
      AuctionHardhat.address,
      convertEtherToWei("10")
    );
    await AuctionHardhat.connect(addr1).getTheItem(1, convertEtherToWei("10"));
    await AuctionHardhat.connect(addr2).getTheItem(2, 0, {
      value: convertEtherToWei("10"),
    });
  });
  it("When Submitting Item if the time hasnot ended it reverts with TimeEnded Custom Error", async () => {
    await expect(
      AuctionHardhat.connect(addr2).SubmitItem(1)
    ).to.be.revertedWithCustomError(AuctionHardhat, "TimeHasNotFinished");
  });
  it("When Submitting Item if the other than highest bider and auctionMaker", async () => {
    await ethers.provider.send("evm_increaseTime", [87400]);
    await expect(
      AuctionHardhat.connect(owner).SubmitItem(1)
    ).to.be.revertedWithCustomError(AuctionHardhat, "NotAuthorised");
  });
  it("The code should be executed and balance of smart Contract should be updated", async () => {
    await ethers.provider.send("evm_increaseTime", [87400]);
    await expect(
      AuctionHardhat.connect(addr2).SubmitItem(2)
    ).to.changeEtherBalance(AuctionHardhat.address, convertEtherToWei("-10"));
    // await expect(await AuctionHardhat.connect(addr2).SubmitItem(2)).to.changeEtherBalance(addr2.address, convertEtherToWei("10"));
  });
  it("The code should be executed and balance of auctionMaker should be updated", async () => {
    await ethers.provider.send("evm_increaseTime", [87400]);
    await expect(
      AuctionHardhat.connect(addr2).SubmitItem(2)
    ).to.changeEtherBalance(addr1.address, convertEtherToWei("10"));
  });
  it("The code should be executed and struct should be updated and again the function cannot be called ", async () => {
    await ethers.provider.send("evm_increaseTime", [87400]);
    await AuctionHardhat.connect(addr2).SubmitItem(2);
    const res = await AuctionHardhat.getAuctionDetails(2);

    expect(res.ended).to.equal(true);
    await expect(
      AuctionHardhat.connect(owner).SubmitItem(2)
    ).to.be.revertedWithCustomError(AuctionHardhat, "Ended");
  });

  it("Taking amount by max pricer", async () => {
    await ethers.provider.send("evm_mine", [8640000000000]);
    await expect(
      AuctionHardhat.connect(addr1).takeAmountFromAuction(1)
    ).to.be.revertedWithCustomError(AuctionHardhat, "Denied");
  });

  it("Taking amount from auction by bidders who failed and the bidders details should be upadted", async () => {
    const transaction = await AuctionHardhat.connect(addr3).getTheItem(2, 0, {
      value: convertEtherToWei("20"),
    });
    await transaction.wait();
    await ethers.provider.send("evm_increaseTime", [8640000000000]);

    await expect(
      AuctionHardhat.connect(addr1).takeAmountFromAuction(2)
    ).to.changeEtherBalance(addr1.address, convertEtherToWei("0"));
    await expect(
      AuctionHardhat.connect(owner).takeAmountFromAuction(2)
    ).to.changeEtherBalance(owner.address, convertEtherToWei("0"));

    await expect(
      AuctionHardhat.connect(addr2).takeAmountFromAuction(2)
    ).to.changeEtherBalance(addr2.address, convertEtherToWei("10"));
    const res = await AuctionHardhat.getInvestorDetails(2, owner.address);
    expect(res).to.equal(0);
  });
};

module.exports = SubmitMoneyToWinner;
