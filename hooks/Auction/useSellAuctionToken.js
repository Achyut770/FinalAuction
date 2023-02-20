import { useSigner } from "wagmi";
import convertEtherToWei from "../../Utils/ConvertEtherToWei";
import instances from "../../Utils/ContractWagmiInstance";
import { erc20Address } from "../../Utils/Address";

const useSellAuctionToken = (items) => {
  console.log(items);
  const { data: signer } = useSigner();
  const { auctionContractInstance } = instances();
  const timeStamp = parseInt(new Date(items?.EndingDate)?.getTime() / 1000);
  const now = parseInt(Date.now() / 1000);
  const sellItemWithToken = async () => {
    console.log(items);
    try {
      //  "Achyut", "achyut", convertEtherToWei("10"), 86400;
      const res = await auctionContractInstance
        .connect(signer)
        .sellToAuctionWithToken(
          items.image,
          items.eth,
          items.itemName,
          convertEtherToWei(items?.startingPrice),
          timeStamp - now
        );
      await res.wait();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    sellItemWithToken,
  };
};

export default useSellAuctionToken;
