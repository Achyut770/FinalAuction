import React, { useContext } from "react";
import "./Styles/Indv_History.css";
import convertWeiToEther from "../../Utils/ConvertyWeiTiEther";
import HistoryApi from "../../ContextApi/History";
import useHistoryData from "../../hooks/History/useSwapHistory";

const Selling_History = () => {
  const { input } = useContext(HistoryApi);
  const [loader, setLoader] = React.useState(false);
  const [datas, setData] = React.useState([]);

  useHistoryData(input, setData, setLoader, "sell");

  const TimeStampToDate = (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    return date.toDateString();
  };

  return (
    <div>
      <>
        <div className="Table_Container">
          <div className="key_Container">
            <div className="first"> Auctioner</div>
            <div className="second">Minimum Price </div>
            <div className="third"> Token Id</div>
            <div className="fourth">Ending Date </div>
          </div>
          <div className="value_Container">
            {loader ? (
              <div className="historyCenter">...Loading...</div>
            ) : datas.length === 0 ? (
              <div className="historyCenter">No history to Show</div>
            ) : (
              datas.map((items, index) => {
                return (
                  <div className="value_Indv" key={index}>
                    <div className="first">
                      {items.auctioner.slice(0, 5)}....
                      {items.auctioner.slice(37, 42)}
                    </div>
                    <div className="second">
                      {convertWeiToEther(items.minimum_Price)}
                    </div>
                    <div className="third">{Number(items.Token_id._hex)}</div>
                    <div className="fourth">
                      {TimeStampToDate(Number(items.ending_Date._hex))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Selling_History;
