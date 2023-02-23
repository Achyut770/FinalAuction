import React, { useContext } from "react";
import { useAccount } from "wagmi";
import "./Styles/IndvDetailsButtons.css";
import { useState } from "react";
import BidInput from "./BidInput";
import useExchangeItems from "../../hooks/Auction/useExchangeItems";
import useRefundAmount from "../../hooks/Auction/useGetRefund";
import signer from "../../ContextApi/signer";
import Loader from "../ForAll/Loader";
import { toast } from "react-toastify";

const IndvDetailsButton = ({ data, id, handleChange, input, setClose }) => {
  const { fetchData } = useContext(signer);
  const [loader, setLoader] = React.useState(false);

  const { address } = useAccount();
  const [bidBoolean, setBidBoolean] = useState(true);
  const handleSubmit = () => {
    setBidBoolean((x) => !x);
  };

  const exchangeItems = useExchangeItems();
  const getRefund = useRefundAmount();

  const ExchangeTheItems = async () => {
    try {
      setLoader(() => true);
      await exchangeItems(id);
      toast.success("Successfully");
      fetchData();
      setClose();
      setLoader(() => false);
    } catch (err) {
      console.log(err);
      setLoader(() => false);
      toast.error("Something Went wrong");
    }
  };
  const handleRefund = async () => {
    try {
      setLoader(() => true);
      await getRefund(id);
      toast.success("Successfully Refunded");
      fetchData();
      setClose();
      setLoader(() => false);
    } catch (err) {
      setLoader(() => false);
      toast.error("Something Went wrong");
    }
  };
  let auctionEnded = Number(data.EndingDate._hex) < parseInt(Date.now() / 1000);

  if (loader) {
    return <Loader />;
  }

  if (address === data.auctionMaker)
    return (
      <button
        onClick={ExchangeTheItems}
        className={
          !auctionEnded ? "detailsButton disabledButton" : ` detailsButton `
        }
        disabled={!auctionEnded}
      >
        {auctionEnded ? "Exchange Items" : "Wait Until Auction Ends"}
      </button>
    );
  return bidBoolean ? (
    <button
      className={` detailsButton `}
      onClick={() => (auctionEnded ? handleRefund() : handleSubmit())}
    >
      {auctionEnded
        ? "Get Refund"
        : Number(data.max_Price._hex) === 0
        ? "Be First to bid"
        : "Make a bid"}
    </button>
  ) : (
    <BidInput
      setClose={setClose}
      data={data}
      id={id}
      handleChange={handleChange}
      input={input}
    />
  );
};

export default IndvDetailsButton;
