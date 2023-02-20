import React from "react";
import { useAccount, useContractRead } from "wagmi";
import ERC20Token from "../artifacts/contracts/ERC20Token.sol/ERC20Token.json";
const useTokenBalance = () => {
  const { address } = useAccount();

  const { data } = useContractRead({
    address: "0xD68906dB6cc9B1965Df0C9239c11d8Fb97512325",
    abi: ERC20Token.abi,
    functionName: "balanceOf",
    args: [address],
  });
  return data;
};

export default useTokenBalance;
