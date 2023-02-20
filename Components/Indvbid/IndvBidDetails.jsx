import React from "react";
import "./Styles/IndvBidDetails.css";
import IndvDetailsFromContract from "./IndvDetailsFromContract";
import checkNotaNumber from "../../Utils/CheckNumber";

const IndvBidDetails = ({ items, setClose }) => {
  const [input, setInput] = React.useState({
    ethAmount: "0",
    tokenAmount: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (checkNotaNumber(value)) return;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    console.log(input);
  };
  return (
    <>
      <div className="background_Popopup" onClick={() => setClose()}></div>
      <div className="Nft_Details_Container">
        <div className="nft_Image">
          <img src={`https://gateway.pinata.cloud/ipfs/${items.data}`} />
        </div>
        <div className="Indv_Nft_Details">
          <IndvDetailsFromContract
            id={items.token_Id}
            handleChange={handleChange}
            input={input}
            setClose={setClose}
          />
        </div>
        <div className="cross_Popup" onClick={() => setClose()}>
          <i class="fa-solid fa-xmark "></i>
        </div>
      </div>
    </>
  );
};

export default IndvBidDetails;
