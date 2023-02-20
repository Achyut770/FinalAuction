const BuyTheAuctionItems = require("./Functions/BuyTheAuctionItems");
const SubmitMoneyToWinner = require("./Functions/SubmittingMoney");
const SellToAuction = require("./Functions/SellingT0Auction/SellToAuction");

describe("English Auction", () => {
  describe("SellAuction", SellToAuction);

  describe("Buy The Auction", () => {
    BuyTheAuctionItems();
  });
  describe("For Submit money to maxPricer and withdrawing money by past bidder", () => {
    SubmitMoneyToWinner();
  });
});
