import { useSigner } from "wagmi";
import { auctionAddress } from "../../Utils/Address";
import convertEtherToWei from "../../Utils/ConvertEtherToWei";
import instances from "../../Utils/ContractWagmiInstance";

const useBidItems = (erc20Address) => {
  const { data } = useSigner();
  const { auctionContractInstance, erc20ContractInstance } =
    instances(erc20Address);
  const bidTheItem = async (bool, id, ethAmount, tokenAmount) => {
    const decimal = tokenDataWithAddress[erc20Address][2];
    const amount = tokenAmount * 10 ** 18;
    !bool &&
      (await erc20ContractInstance
        .connect(data)
        .approve(auctionAddress, convertEtherToWei(amount)));

    const transact = await auctionContractInstance
      .connect(data)
      .getTheItem(id, convertEtherToWei(amount), {
        value: convertEtherToWei(ethAmount),
      });
    console.log(transact);
    await transact.wait();
  };
  return bidTheItem;
};
export default useBidItems;
