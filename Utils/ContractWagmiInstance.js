import { useContract } from "wagmi";
import SwapAbi from "../artifacts/contracts/ERC20_Swap.sol/ERC20Swap.json";
import AuctionAbi from "../artifacts/contracts/Auction.sol/Auction.json";
import ERC721Abi from "../artifacts/contracts/ERC721Token.sol/ERC721Token.json";
import erc20ABI from "../artifacts/contracts/ERC20Token.sol/ERC20Token.json";
import { useProvider } from "wagmi";
import {
  auctionAddress,
  erc20Address,
  erc721Address,
  swapAddress,
} from "./Address";
export default function instances(erc20addressFromParam) {
  const provider = useProvider();

  const swapContractInstance = useContract({
    address: swapAddress,
    abi: SwapAbi.abi,
    signerOrProvider: provider,
  });

  const erc721ContractInstance = useContract({
    address: erc721Address,
    abi: ERC721Abi.abi,
    signerOrProvider: provider,
  });

  const erc20ContractInstance = useContract({
    address: erc20addressFromParam,
    abi: erc20ABI.abi,
    signerOrProvider: provider,
  });

  const auctionContractInstance = useContract({
    address: auctionAddress,
    abi: AuctionAbi.abi,
    signerOrProvider: provider,
  });

  return {
    swapContractInstance,
    erc721ContractInstance,
    erc20ContractInstance,
    auctionContractInstance,
  };
}
