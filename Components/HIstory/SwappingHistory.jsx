import React from "react";
import "./Styles/Indv_History.css";
import useHistoryData from "../../hooks/History/useSwapHistory";
import HistoryApi from "../../ContextApi/History";
import convertWeiToEther from "../../Utils/ConvertyWeiTiEther";

const SwappingHistory = () => {
  const { input } = React.useContext(HistoryApi);
  const [data, setData] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  useHistoryData(input, setData, setLoader, "swap");
  console.log("swap", data);

  return (
    <>
      <div className="Table_Container">
        <div className="key_Container">
          <div className="first"> Swapper</div>
          <div className="second"> To </div>
          <div className="third"> From</div>
          <div className="fourth">Amount </div>
        </div>
        <div className="value_Container">
          {loader ? (
            <div className="historyCenter">...Loading...</div>
          ) : data.length === 0 ? (
            <div className="historyCenter">No History To Show</div>
          ) : (
            data.map((items, index) => {
              return (
                <div className="value_Indv">
                  <div className="first">
                    {items.swapper.slice(0, 5)}... {items.swapper.slice(37, 42)}
                  </div>
                  <div className="second">{items.to}</div>
                  <div className="third">{items.from}</div>
                  <div className="fourth">
                    {Number(convertWeiToEther(items.amount)).toFixed(3)}
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

export default SwappingHistory;
