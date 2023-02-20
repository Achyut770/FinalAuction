import instances from "../../Utils/ContractWagmiInstance";
import { useSigner } from "wagmi";

const useRefundAmount = () => {
  const { auctionContractInstance } = instances();
  const { data } = useSigner();
  console.log(auctionContractInstance);
  const exchangeItems = async (tokenId) => {
    const transact = await auctionContractInstance
      .connect(data)
      .takeAmountFromAuction(tokenId);
    await transact.wait();
  };
  return exchangeItems;
};

export default useRefundAmount;
