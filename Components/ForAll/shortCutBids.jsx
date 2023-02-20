import React from "react";
import "./Styles/shortCutBid.css";
import Card from "../ForAll/Card";
import signerApi from "../../ContextApi/signer";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ShortCutBids = ({ normalOrTrending, top, data }) => {
  const navigate = useNavigate();

  const { loading } = useContext(signerApi);
  console.log(loading);
  return (
    <>
      <div
        className={
          normalOrTrending === "Top Items"
            ? "product_ShortCut "
            : "product_ShortCut top_Gap"
        }
      >
        {top && (
          <div className="product_ShortCut_Top">
            <div className="product_ShortCut_Top_Left">{normalOrTrending}</div>
            <div className="product_ShortCut_Top_Right">
              <div className="product_ShortCut_Top_Right_Left">
                <div>Latest</div>
                <div>|</div>
                <div onClick={() => navigate("/bid")}>
                  <b>View More...</b>
                </div>
              </div>
              <div className="lockSuit">
                <i class="fa-solid fa-boxes-packing suitLock "></i>|
                <i className="fa-solid fa-location-pin-lock suitLock "></i>
              </div>
            </div>
            <div className="border"></div>
          </div>
        )}
        <div className="product_ShortCut_Bottom">
          {loading ? (
            <div className="historyCenter">Loading</div> // In Indv_History.css
          ) : data.length === 0 ? (
            <div className="historyCenter">No Bids</div>
          ) : (
            data.map((items, index) => {
              return <Card items={items} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default ShortCutBids;
