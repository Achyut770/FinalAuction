import React from "react";
import "./Styles/IndvDetailsFromContract.css";
import useReadIndvDataFromContract from "../../hooks/ReadIndvDataFromContract";
import convertWeiToEther from "../../Utils/ConvertyWeiTiEther";
import IndvDetailsButton from "./IndvDetailsButton";
import useTokenBalance from "../../hooks/TokenBalance";
import { tokenDataWithAddress } from "../../Data/TokenData";
import convertEtherToWei from "../../Utils/ConvertEtherToWei";
const IndvDetailsFromContract = ({ id, handleChange, input, setClose }) => {
  // const datas = useTokenBalance();
  const data = useReadIndvDataFromContract(id);
  if (!data) {
    return <div>...Loading...</div>;
  }
  let auctionEnded = Number(data.EndingDate._hex) < parseInt(Date.now() / 1000);
  const dateEndingCount = () => {
    let date = data.EndingDate - parseInt(Date.now() / 1000);
    var s = (
      Math.floor(date / 86400) +
      ":" +
      new Date(date * 1000).toISOString().substr(11, 8)
    ).split(":");
    return `${s[0]} days, ${s[1]} hours, ${s[2]} minutes, ${s[3]} seconds`;
  };

  console.log(data);

  //https://freematic.com/earn-more
  return (
    <>
      <div className="IndvDetailsFromContract">
        <div className="Name">{data.name}</div>
        <div className="key_Value">
          <div>
            <b>Bid Maker:</b>
          </div>
          <div>
            {data.auctionMaker.slice(0, 10)}...{data.auctionMaker.slice(32, 42)}
          </div>
        </div>
        <div className="key_Value">
          <div>
            <b>Ends after:</b>
          </div>
          <div>{auctionEnded ? "Auction Ended" : dateEndingCount()}</div>
        </div>

        <div className="key_Value">
          <div>
            <b>Starting Bid;</b>
          </div>
          <div className="tokenNameAndImage">
            <span>
              {data.eth
                ? convertWeiToEther(data.startingPrice)
                : Number(data.startingPrice) /
                  10 ** tokenDataWithAddress[data.tokenAddress][2]}
            </span>
            {data.eth ? (
              <img
                className="tokenAndEthImagesIndvDetails"
                src="https://i.ibb.co/Lpcx7p8/ethereum.png"
              />
            ) : (
              <div className="tokenNameAndImage">
                <div>{tokenDataWithAddress[data.tokenAddress][0]}</div>
                <img
                  className="tokenAndEthImagesIndvDetails"
                  src={tokenDataWithAddress[data.tokenAddress][1]}
                />
              </div>
            )}
          </div>
        </div>
        <div className="key_Value">
          <div>
            <b>Highest Bid</b>
          </div>
          <div>
            {data.eth
              ? convertWeiToEther(data.max_Price)
              : Number(data.max_Price) /
                10 ** tokenDataWithAddress[data.tokenAddress][2]}
          </div>
        </div>

        <div>
          <IndvDetailsButton
            data={data}
            id={id}
            handleChange={handleChange}
            input={input}
            setClose={setClose}
          />
        </div>
      </div>
    </>
  );
};

export default IndvDetailsFromContract;
