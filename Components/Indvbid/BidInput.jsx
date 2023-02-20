import React from "react";
import "./Styles/BidInput.css";
import useBidItems from "../../hooks/Auction/BidItems";
import Loader from "../ForAll/Loader";
import { toast } from "react-toastify";
const BidInput = ({ data, id, input, handleChange, setClose }) => {
  const [loader, setLoader] = React.useState();
  const bidTheItem = useBidItems(data.tokenAddress);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(() => true);
      console.log(loader);
      await bidTheItem(data.eth, id, input.ethAmount, input.tokenAmount);
      toast.success("Successfully bidded");
      setClose();
      setLoader(() => false);
    } catch (err) {
      console.log(err);
      setLoader(() => false);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
      {loader && <Loader />}
      <form onSubmit={handleSubmit}>
        <input
          className="bidInput"
          name={data.eth ? "ethAmount" : "tokenAmount"}
          type="text"
          onChange={handleChange}
          value={data.eth ? input.ethAmount : input.tokenAmount}
          placeholder="Ether amount..."
        />
        <button className="button" type="submit">
          Bid
        </button>
      </form>
    </div>
  );
};

export default BidInput;
