import { erc20Address, swapAddress } from "../../Utils/Address";
import instances from "../../Utils/ContractWagmiInstance";
import { useSigner } from "wagmi";
const useConvertTokenToEth = () => {
  const { swapContractInstance, erc20ContractInstance } =
    instances(erc20Address);
  console.log(swapContractInstance);
  const { data: signer } = useSigner();
  const Swap = async (amount) => {
    try {
      await erc20ContractInstance.connect(signer).approve(swapAddress, amount);
      const res = await swapContractInstance
        .connect(signer)
        .swapEthFromToken(amount._hex);
      await res.wait();
      return true;
    } catch (error) {
      return false;
    }
  };

  return Swap;
};

export default useConvertTokenToEth;
