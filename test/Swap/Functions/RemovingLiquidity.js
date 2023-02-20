const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../ContractInstances");
const { expect } = require("chai");

const RemovingLiquidity = () => {
  let addr1;
  let owner;
  let ERC20SwapHardhat;

  beforeEach(async () => {
    ({ addr1, owner, ERC20SwapHardhat, ERC20TokenHardhat } =
      await ContractInstances());
    await ERC20TokenHardhat.connect(owner).approve(
      ERC20SwapHardhat.address,
      convertEtherToWei("1000")
    );
    const transact = await ERC20SwapHardhat.connect(owner).addLiquidity(
      convertEtherToWei("1000"),
      {
        value: convertEtherToWei("1000"),
      }
    );
    await transact.wait();
  });
  it("Should revert if caller dont have enough share", async () => {
    await expect(
      ERC20SwapHardhat.connect(addr1).removeLiquidity(convertEtherToWei("1"))
    ).to.be.revertedWithCustomError(ERC20SwapHardhat, "Errors");
  });
  it("Should remove shares If the required condition is met", async () => {
    await ERC20SwapHardhat.connect(owner).removeLiquidity(
      convertEtherToWei("1")
    );

    expect(await ERC20SwapHardhat.balanceOf(owner.address)).to.equal(
      convertEtherToWei("999")
    );
    expect(await ERC20SwapHardhat.reserve0()).to.equal(
      convertEtherToWei("999")
    );
    expect(await ERC20SwapHardhat.reserve1()).to.equal(
      convertEtherToWei("999")
    );
    expect(await ERC20SwapHardhat.totalSupply()).to.equal(
      convertEtherToWei("999")
    );
  });
  it("Ether Balance Should be change", async () => {
    await ERC20SwapHardhat.connect(owner).removeLiquidity(
      convertEtherToWei("1")
    );
    await expect(
      ERC20SwapHardhat.connect(owner).removeLiquidity(convertEtherToWei("1"))
    ).to.changeEtherBalances(
      [ERC20SwapHardhat, owner],
      [convertEtherToWei("-1"), convertEtherToWei("1")]
    );
  });
  it("Token Balance Should be change", async () => {
    await ERC20SwapHardhat.connect(owner).removeLiquidity(
      convertEtherToWei("1")
    );
    await expect(
      ERC20SwapHardhat.connect(owner).removeLiquidity(convertEtherToWei("1"))
    ).to.changeTokenBalances(
      ERC20TokenHardhat,
      [ERC20SwapHardhat, owner],
      [convertEtherToWei("-1"), convertEtherToWei("1")]
    );
  });
};

module.exports = RemovingLiquidity;
