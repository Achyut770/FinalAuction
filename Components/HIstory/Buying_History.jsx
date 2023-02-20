import React from "react";
import "./Styles/Indv_History.css";
import useHistoryData from "../../hooks/History/useSwapHistory";
import HistoryApi from "../../ContextApi/History";
import convertWeiToEther from "../../Utils/ConvertyWeiTiEther";

const Buying_History = () => {
  const { input } = React.useContext(HistoryApi);
  const [data, setData] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  useHistoryData(input, setData, setLoader, "buy");
  return (
    <>
      <div className="Table_Container">
        <div className="key_Container">
          <div className="first"> Buyer</div>
          <div className="second">Seller </div>
          <div className="third"> Token Id</div>
          <div className="fourth">Amount </div>
        </div>
        <div className="value_Container">
          {loader ? (
            <div className="historyCenter">...Loading...</div>
          ) : data.length === 0 ? (
            <div className="historyCenter"> No history to show</div>
          ) : (
            data.map((items, index) => {
              return (
                <div className="value_Indv">
                  <div className="first">
                    {items.buyer.slice(0, 5)}....
                    {items.buyer.slice(37, 42)}
                  </div>
                  <div className="second">
                    {items.auctioner.slice(0, 5)}....
                    {items.auctioner.slice(37, 42)}
                  </div>
                  <div className="third">{Number(items.Token_Id._hex)}</div>
                  <div className="fourth">
                    {convertWeiToEther(items.amount)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Buying_History;
