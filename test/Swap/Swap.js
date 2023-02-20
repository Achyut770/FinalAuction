const AddTheliquidity = require("./Functions/AddingLiquidity");
const SwapTokenAndEth = require("./Functions/SwapTokenAndEth");
const RemovingLiquidity = require("./Functions/RemovingLiquidity");

describe("Swap", () => {
  describe("Adding Liquidity To the Contract", () => {
    AddTheliquidity();
  });

  describe("Swap Ether And Token", () => {
    SwapTokenAndEth();
  });
  describe("Removing Liquidity", () => {
    RemovingLiquidity();
  });
});
