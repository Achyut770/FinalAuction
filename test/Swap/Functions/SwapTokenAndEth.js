const convertEtherToWei = require("../../convertEtherToWei");
const ContractInstances = require("../ContractInstances");
const { expect } = require("chai");

const SwapTokenAndEth = () => {
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
  it("The token and eth should swap if required condition is met swapEthFromToken", async () => {
    await ERC20TokenHardhat.connect(owner).transfer(
      addr1.address,
      convertEtherToWei("200")
    );
    await ERC20TokenHardhat.connect(addr1).approve(
      ERC20SwapHardhat.address,
      convertEtherToWei("200")
    );
    await expect(
      ERC20SwapHardhat.connect(addr1).swapEthFromToken(convertEtherToWei("100"))
    ).to.changeEtherBalances(
      [ERC20SwapHardhat, addr1],
      [
        convertEtherToWei("-90.636363636363636363"),
        // You can calculate this using the principle of  Constatnt Product Automated Market MAker
        // (X+x)(Y-y) = XY
        //y = Xy/(y+Y)
        // X is The balance of Token Or eth You want to trade using it .
        // x means amount of Token Or eth you want to trade for Token Or eth  .
        // Y is balance of Token Or eth you want to trade for
        // and y is the amount you will get
        convertEtherToWei("90.636363636363636363"),
      ]
    );
    await expect(
      ERC20SwapHardhat.connect(addr1).swapEthFromToken(convertEtherToWei("100"))
    ).to.changeTokenBalances(
      ERC20TokenHardhat,
      [ERC20SwapHardhat, addr1],
      [convertEtherToWei("100"), convertEtherToWei("-100")]
    );
  });
  it("The token and eth should swap if required condition is met swapTokenFromhEth", async () => {
    await expect(
      ERC20SwapHardhat.connect(addr1).swapTokenFromhEth({
        value: convertEtherToWei("100"),
      })
    ).to.changeTokenBalances(
      ERC20TokenHardhat,
      [ERC20SwapHardhat, addr1],
      [
        convertEtherToWei("-90.636363636363636363"),
        convertEtherToWei("90.636363636363636363"),
      ]
    );
    await expect(
      ERC20SwapHardhat.connect(addr1).swapTokenFromhEth({
        value: convertEtherToWei("100"),
      })
    ).to.changeEtherBalances(
      [ERC20SwapHardhat, addr1],
      [convertEtherToWei("100"), convertEtherToWei("-100")]
    );

    expect(await ERC20SwapHardhat.reserve1()).to.equal(
      convertEtherToWei("1200")
    );
    expect(await ERC20SwapHardhat.reserve0()).to.equal("833810674242424242424");
  });
};

module.exports = SwapTokenAndEth;
