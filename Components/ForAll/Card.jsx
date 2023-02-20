import React from "react";
import IndvBidDetails from "../Indvbid/IndvBidDetails";

const Card = ({ items }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    setShow(() => true);
  };

  return (
    <>
      {show && (
        <IndvBidDetails items={items} setClose={() => setShow(() => false)} />
      )}
      <div className="Indv_Card">
        <div className="card_Top">
          <img
            className=""
            src={`https://gateway.pinata.cloud/ipfs/${items.data}`}
            alt="#"
          />
        </div>
        <div className="card_Bottom">
          <div className="card_Botoom_Right">
            {/* <div>{items.name}</div> */}
            <button onClick={() => handleClick()}>View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
