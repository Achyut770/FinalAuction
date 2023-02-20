import { useSigner } from "wagmi";
import convertEtherToWei from "../../Utils/ConvertEtherToWei";
import instances from "../../Utils/ContractWagmiInstance";

const useSellAuctionEth = (items) => {
  const { data: signer } = useSigner();
  const { auctionContractInstance } = instances();
  const timeStamp = parseInt(new Date(items?.EndingDate)?.getTime() / 1000);
  const now = parseInt(Date.now() / 1000);
  const sellItemWithEth = async () => {
    try {
      //  "Achyut", "achyut", convertEtherToWei("10"), 86400;
      const res = await auctionContractInstance
        .connect(signer)
        .sellToAuctionWithEth(
          items.image,
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
    sellItemWithEth,
  };
};

export default useSellAuctionEth;
