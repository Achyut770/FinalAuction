import { useSigner } from "wagmi";
import { auctionAddress } from "../../Utils/Address";
import convertEtherToWei from "../../Utils/ConvertEtherToWei";
import instances from "../../Utils/ContractWagmiInstance";
import { tokenDataWithAddress } from "../../Data/TokenData";

const useBidItems = (erc20Address) => {
  const { data } = useSigner();
  const { auctionContractInstance, erc20ContractInstance } =
    instances(erc20Address);
  const bidTheItem = async (bool, id, ethAmount, tokenAmount) => {
    tokenDataWithAddress[erc20Address][2];
    const amount = tokenAmount * 10 ** 18;
    !bool &&
      (await erc20ContractInstance
        .connect(data)
        .approve(auctionAddress, amount.toString()));

    const transact = await auctionContractInstance
      .connect(data)
      .getTheItem(id, amount.toString(), {
        value: convertEtherToWei(ethAmount),
      });
    await transact.wait();
  };
  return bidTheItem;
};
export default useBidItems;
