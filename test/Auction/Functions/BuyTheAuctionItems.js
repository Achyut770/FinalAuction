const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../ContractInstances");
const { expect } = require("chai");

const BuyTheAuctionItems = () => {
  let addr1;
  let AuctionHardhat;
  let ERC20TokenHardhat;
  let addr2;

  beforeEach(async () => {
    ({ addr1, addr2, ERC20TokenHardhat, AuctionHardhat } =
      await ContractInstances());
    const data = await AuctionHardhat.connect(addr1).sellToAuctionWithToken(
      "Achyut",
      ERC20TokenHardhat.address,
      "achyut",
      convertEtherToWei("10"),
      86400
    );

    const datas = await AuctionHardhat.connect(addr1).sellToAuctionWithEth(
      "Achyut",
      "achyut",
      convertEtherToWei("10"),
      86400
    );
    await datas.wait();
  });
  it("Should revert when auction hasnot started", async () => {
    await expect(
      AuctionHardhat.connect(addr2).getTheItem(3, convertEtherToWei("10"))
    ).to.be.revertedWithCustomError(AuctionHardhat, "NotStarted");
  });

  it("Should be reverted when auction ends ", async () => {
    await ethers.provider.send("evm_increaseTime", [87400]);
    await expect(
      AuctionHardhat.connect(addr2).getTheItem(1, convertEtherToWei("10"))
    ).to.be.revertedWithCustomError(AuctionHardhat, "AlreadyEnded");
  });

  it("Ether and token should be greater than  starting Price specified at the beggining ", async () => {
    await expect(
      AuctionHardhat.connect(addr2).getTheItem(1, convertEtherToWei("1"))
    )
      .to.be.revertedWithCustomError(AuctionHardhat, "WhilePurchasing")
      .withArgs();
    await expect(
      AuctionHardhat.connect(addr2).getTheItem(2, 0, {
        value: convertEtherToWei("2"),
      })
    )
      .to.be.revertedWithCustomError(AuctionHardhat, "WhilePurchasing")
      .withArgs();
  });
  it("Ether and token should be greater than  highest bid", async () => {
    await ERC20TokenHardhat.connect(owner).transfer(
      addr2.address,
      convertEtherToWei("30")
    );

    await ERC20TokenHardhat.connect(addr2).approve(
      AuctionHardhat.address,
      convertEtherToWei("30")
    );
    await AuctionHardhat.connect(addr2).getTheItem(1, convertEtherToWei("30"));

    await AuctionHardhat.connect(addr2).getTheItem(2, 0, {
      value: convertEtherToWei("30"),
    });
    await expect(
      AuctionHardhat.connect(addr1).getTheItem(1, convertEtherToWei("25"))
    )
      .to.be.revertedWithCustomError(AuctionHardhat, "WhilePurchasing")
      .withArgs();
    await expect(
      AuctionHardhat.connect(addr1).getTheItem(2, convertEtherToWei("30"), {
        value: convertEtherToWei("25"),
      })
    )
      .to.be.revertedWithCustomError(AuctionHardhat, "WhilePurchasing")
      .withArgs();
  });

  it("The token or ether balances should be updated", async () => {
    await ERC20TokenHardhat.connect(owner).approve(
      AuctionHardhat.address,
      convertEtherToWei("10")
    );

    await expect(
      AuctionHardhat.getTheItem(1, convertEtherToWei("10"))
    ).to.changeTokenBalances(
      ERC20TokenHardhat,
      [owner.address, AuctionHardhat.address],
      [convertEtherToWei("-10"), convertEtherToWei("10")]
    );

    await expect(
      AuctionHardhat.connect(owner).getTheItem(2, 0, {
        value: convertEtherToWei("10"),
      })
    ).to.changeEtherBalances(
      [owner.address, AuctionHardhat.address],
      [convertEtherToWei("-10"), convertEtherToWei("10")]
    );
  });
  it("Code should be executed and events and struct should be updated ", async () => {
    await ERC20TokenHardhat.connect(owner).approve(
      AuctionHardhat.address,
      convertEtherToWei("10")
    );
    await AuctionHardhat.connect(owner).getTheItem(1, convertEtherToWei("10"));
    await AuctionHardhat.connect(owner).getTheItem(2, 0, {
      value: convertEtherToWei("10"),
    });

    const res = await AuctionHardhat.getAuctionDetails(1);
    const res2 = await AuctionHardhat.getAuctionDetails(2);

    //res
    expect(res.max_Pricer).to.equal(owner.address);
    expect(res.max_Price).to.equal(convertEtherToWei("10"));

    //res2
    expect(res2.max_Pricer).to.equal(owner.address);
    expect(res2.max_Price).to.equal(convertEtherToWei("10"));
  });
  it("Max Price and max_Pricer should be updated when higher bid is submitted", async () => {
    await AuctionHardhat.connect(owner).getTheItem(2, 0, {
      value: convertEtherToWei("20"),
    });
    const res = await AuctionHardhat.getAuctionDetails(2);
    expect(res.max_Pricer).to.equal(owner.address);
    expect(res.max_Price).to.equal(convertEtherToWei("20"));
  });

  it("Investors details should be updated", async () => {
    await AuctionHardhat.connect(owner).getTheItem(2, 0, {
      value: convertEtherToWei("20"),
    });
    const res = await AuctionHardhat.getInvestorDetails(2, owner.address);
    expect(res).to.equal(convertEtherToWei("20"));
  });

  it("Max Price should be added to when called buy the max_pricer", async () => {
    await AuctionHardhat.connect(owner).getTheItem(2, 0, {
      value: convertEtherToWei("20"),
    });
    await AuctionHardhat.connect(owner).getTheItem(2, 0, {
      value: convertEtherToWei("20"),
    });
    const res = await AuctionHardhat.getAuctionDetails(2);
    expect(res.max_Pricer).to.equal(owner.address);
    expect(res.max_Price).to.equal(convertEtherToWei("40"));
  });
};

module.exports = BuyTheAuctionItems;
