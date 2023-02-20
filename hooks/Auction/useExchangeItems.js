import instances from "../../Utils/ContractWagmiInstance";
import { useSigner } from "wagmi";

const useExchangeItems = () => {
  const { auctionContractInstance } = instances();
  const { data } = useSigner();
  const exchangeItems = async (tokenId) => {
    const transact = await auctionContractInstance
      .connect(data)
      .SubmitItem(tokenId);
    await transact.wait();
  };
  return exchangeItems;
};

export default useExchangeItems;
