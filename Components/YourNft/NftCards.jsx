import React from "react";
import "./styles/NftCard.css";
const NftCards = ({ items }) => {
  return (
    <div className="nftCard">
      <img src={`https://gateway.pinata.cloud/ipfs/${items.data}`} alt="#" />
    </div>
  );
};

export default NftCards;
