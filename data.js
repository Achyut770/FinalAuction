import { ethers } from "ethers";

export let data = [
  {
    name: "Achyut",
    token_Id: "1",
    EndingDate: Date.now() + 86400,

    auctionMaker: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    max_Pricer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    eth: true,
    ended: false,
  },
  {
    name: "Achyut",
    token_Id: "2",
    EndingDate: Date.now() + 30000,

    auctionMaker: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    max_Pricer: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    eth: true,
    ended: false,
  },
  {
    name: "Achyut",
    token_Id: "3",
    EndingDate: Date.now() + 30000,

    auctionMaker: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    max_Pricer: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    eth: true,
    ended: false,
  },
  {
    name: "Achyut",
    token_Id: "4",
    EndingDate: Date.now() + 30000,

    auctionMaker: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    max_Pricer: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    eth: true,
    ended: false,
  },
];

export let inputData = [
  {
    topic: "Item Name",
    type: "text",
    name: "itemName",
    placeHolder: "",
  },

  {
    topic: "Starting Price",
    type: "text",
    name: "startingPrice",
    placeHolder: "",
  },
  {
    topic: "Ending Date",
    type: "date",
    name: "EndingDate",
    placeHolder: "",
  },
  {
    topic: "Image",
    type: "file",
    name: "image",
    placeHolder: "",
  },
];
