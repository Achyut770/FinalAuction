import instances from "../../Utils/ContractWagmiInstance";
import { useSigner } from "wagmi";

const useConvertEthToToken = () => {
  const { swapContractInstance } = instances();
  const { data: signer } = useSigner();

  const Swap = async (amount) => {
    try {
      const res = await swapContractInstance.connect(signer).swapTokenFromhEth({
        value: amount,
      });
      await res.wait();
      return true;
    } catch (error) {
      return false;
    }
  };

  return Swap;
};

export default useConvertEthToToken;
