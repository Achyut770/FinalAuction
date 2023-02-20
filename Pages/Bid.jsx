import React, { useContext, useState } from "react";
import ShortCutBids from "../Components/ForAll/shortCutBids";
import BgPhoto from "../Components/ForAll/BgPhoto";
import BidSearch from "../Components/BId/BidSearch";
import signer from "../ContextApi/signer";

const Bid = () => {
  const { data } = useContext(signer);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const filteredData = data.filter(
        (item) => item.token_Id.toString() === input
      );
      console.log(filteredData);
      setFilteredData(filteredData);
    } catch (error) {
      console.log(error);
    }
    //Filter the data based on input value
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  React.useEffect(() => {
    setFilteredData(() => [...data]);
  }, [data]);

  return (
    <>
      <BgPhoto
        image="https://media.istockphoto.com/id/1365119130/photo/male-auctioneer-pointing-at-one-of-people-with-auction-paddles.jpg?b=1&s=170667a&w=0&k=20&c=c8Qm1PoIajqZeUV46dWuAshdaNXe1v6EW3DRBtnub78="
        Topic="Bid your favourite item"
      />
      <BidSearch handleChange={handleChange} handleSubmit={handleSubmit} />
      <ShortCutBids data={filteredData} />
    </>
  );
};

export default Bid;
