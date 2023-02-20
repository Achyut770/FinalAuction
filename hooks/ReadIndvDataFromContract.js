import { useContractRead } from "wagmi";
import AuctionAbi from "../artifacts/contracts/Auction.sol/Auction.json";
import { auctionAddress } from "../Utils/Address";

function useReadIndvDataFromContract(id) {
  const { data } = useContractRead({
    address: auctionAddress,
    abi: AuctionAbi.abi,
    functionName: "getAuctionDetails",
    args: [id],
  });
  return data;
}

export default useReadIndvDataFromContract;
