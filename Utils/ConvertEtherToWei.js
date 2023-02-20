import { ethers } from "ethers";
export default function convertEtherToWei(n) {
  return ethers.utils.parseEther(n);
}
