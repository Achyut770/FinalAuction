// import React from "react";
// import { usePrepareContractWrite, useContractWrite } from "wagmi";
// import ERC20Token from "../artifacts/contracts/ERC20Token.sol/ERC20Token.json";

// const useSendAllowance = (tokenAmount) => {
//   const { config } = usePrepareContractWrite({
//     address: "0xD68906dB6cc9B1965Df0C9239c11d8Fb97512325",
//     abi: ERC20Token.abi,
//     functionName: "approve",
//     args: ["0x2ba1c193f591c2d63f8404c68dc78b49c9b1e239", tokenAmount],
//     overrides: {
//       gasPrice: 10000000,
//       value: tokenAmount,
//     },
//   });
//   const response = useContractWrite(config);
//   return response;
// };

// export default useSendAllowance;

// // import React from "react";
// // import { usePrepareContractWrite, useContractWrite } from "wagmi";
// // import ERC20Token from "../artifacts/contracts/ERC20Token.sol/ERC20Token.json";

// // const useSendAllowance = (tokenAmount) => {
// //   const approveAllowance = async () => {
// //     console.log(signer);
// //     try {
// //       const res = await erc20ContractInstance
// //         .connect(signer)
// //         .approve("0x2ba1c193f591c2d63f8404c68dc78b49c9b1e239", tokenAmount);
// //       await res.wait();
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   return approveAllowance;
// // };

// // export default useSendAllowance;
