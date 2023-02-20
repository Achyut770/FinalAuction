import React from "react";

import BgPhoto from "../Components/ForAll/BgPhoto";
import "../Styles/IndvNft.css";
import YourNftContainer from "../Components/YourNft/YourNftContainer";

const IndvNft = () => {
  return (
    <>
      <BgPhoto
        Topic="Your Nfts"
        image="https://media.istockphoto.com/id/1367699775/photo/nft-non-fungible-token-golden-coins-falling-trendy-cryptocurrencies-and-coins-on-the.jpg?b=1&s=170667a&w=0&k=20&c=9oFb0ZEq_r2QfLVW-4JrYK7KI_8eUdhOCayCDXrSMg4="
      />
      <YourNftContainer />
    </>
  );
};

export default IndvNft;
