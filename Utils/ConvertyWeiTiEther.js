import { ethers } from "ethers";
export default function convertWeiToEther(n) {
  return ethers.utils.formatEther(n);
}
