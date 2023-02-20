import instances from "../Utils/ContractWagmiInstance";
import { auctionAddress } from "../Utils/Address";
const ReadData = () => {
  const { erc721ContractInstance } = instances();
  const wholeData = async (i, array) => {
    let data = await erc721ContractInstance.tokenURI(i);
    data = {
      data,
      token_Id: i,
    };
    array.push(data);
  };

  const dataFetching = async (address) => {
    console.log(erc721ContractInstance);
    const length = await erc721ContractInstance.totalSupply();
    let array = [];
    let indvArray = [];
    for (let i = 35; i <= length; i++) {
      try {
        const data = await erc721ContractInstance.ownerOf(i);
        if (data.toUpperCase() === auctionAddress.toUpperCase()) {
          await wholeData(i, array);
        }
        if (data.toUpperCase() === address.toUpperCase()) {
          await wholeData(i, indvArray);
        }
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    console.log("whole", array);
    console.log("indvArray", indvArray);
    return { array, indvArray };
  };

  return { dataFetching };
};
export default ReadData;
