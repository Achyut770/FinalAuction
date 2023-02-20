const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../ContractInstances");
const { expect } = require("chai");

const AddTheliquidity = () => {
  let addr1;
  let owner;
  let ERC20SwapHardhat;

  beforeEach(async () => {
    ({ addr1, owner, ERC20SwapHardhat, ERC20TokenHardhat } =
      await ContractInstances());
    await ERC20TokenHardhat.connect(owner).approve(
      ERC20SwapHardhat.address,
      convertEtherToWei("300")
    );
    await ERC20SwapHardhat.connect(owner).addLiquidity(
      convertEtherToWei("100"),
      {
        value: convertEtherToWei("20"),
      }
    );
  });
  it("Should min shares and update the balance When add Liquidity is called for first Time", async () => {
    expect(await ERC20SwapHardhat.balanceOf(owner.address)).to.equal(
      "44721359549995793928"
    ); // At first shares is calculated shares = sqrt(1oo*20);

    await expect(
      ERC20SwapHardhat.connect(owner).addLiquidity(convertEtherToWei("100"), {
        value: convertEtherToWei("20"),
      })
    ).to.changeEtherBalances(
      [ERC20SwapHardhat, owner],
      [convertEtherToWei("20"), convertEtherToWei("-20")]
    );
    await expect(
      ERC20SwapHardhat.connect(owner).addLiquidity(convertEtherToWei("100"), {
        value: convertEtherToWei("20"),
      })
    ).to.changeTokenBalances(
      ERC20TokenHardhat,
      [ERC20SwapHardhat, owner],
      [convertEtherToWei("100"), convertEtherToWei("-100")]
    );

    expect(await ERC20SwapHardhat.reserve0()).to.equal(
      convertEtherToWei("300")
    );
    expect(await ERC20SwapHardhat.reserve1()).to.equal(convertEtherToWei("60"));
    expect(await ERC20SwapHardhat.totalSupply()).to.equal(
      "134164078649987381784"
    );
  });

  it("Should revert when the reserve ratio dosenot match with the ratios of input for second time ", async () => {
    await expect(
      ERC20SwapHardhat.connect(owner).addLiquidity(convertEtherToWei("10"), {
        value: convertEtherToWei("20"),
      })
    ).to.be.revertedWithCustomError(ERC20SwapHardhat, "Errors");
  });
  it("Code should get executed when The required condition are met ", async () => {
    await ERC20TokenHardhat.transfer(addr1.address, convertEtherToWei("200"));
    await ERC20TokenHardhat.connect(addr1).approve(
      ERC20SwapHardhat.address,
      convertEtherToWei("300")
    );
    await ERC20SwapHardhat.connect(addr1).addLiquidity(
      convertEtherToWei("200"),
      {
        value: convertEtherToWei("40"),
      }
    );
    expect(await ERC20SwapHardhat.balanceOf(addr1.address)).to.equal(
      "89442719099991587856"
    );
    // You can get using formula shares = y*T/Y  T is totalSupply ,
    // y is amountin and Y is the Total Balance of token y in contract.
    //  or
    //  share = x*T/X

    expect(await ERC20SwapHardhat.reserve0()).to.equal(
      convertEtherToWei("300")
    );
    expect(await ERC20SwapHardhat.reserve1()).to.equal(convertEtherToWei("60"));
  });
};

module.exports = AddTheliquidity;
