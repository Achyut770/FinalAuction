import React from "react";
import NftCards from "./NftCards";
import "./styles/YourNftContainer.css";
import { useContext } from "react";
import signer from "../../ContextApi/signer";
const YourNftContainer = () => {
  const { indvData, loading } = useContext(signer);
  console.log("indvNft", indvData);
  return (
    <>
      <div className="nftMainContainer">
        {loading ? (
          <div className="LoadingNoNft">...Loading Nfts...</div> // In Indv_History.css
        ) : indvData.length === 0 ? (
          <div className="LoadingNoNft">No Nfts</div>
        ) : (
          <div className="nftContainer">
            {indvData.map((items, index) => {
              return <NftCards items={items} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default YourNftContainer;
