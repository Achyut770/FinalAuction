import React, { useContext } from "react";
import BgPhoto from "../Components/ForAll/BgPhoto";
import SwappingHistory from "../Components/HIstory/SwappingHistory";
import Selling_History from "../Components/HIstory/Selling_History";
import Buying_History from "../Components/HIstory/Buying_History";
import "../Styles/History.css";
import HistorySearch from "../Components/HIstory/HistorySearch";
import { useAccount } from "wagmi";
import HistoryApi from "../ContextApi/History";

let historyData = [
  {
    name: "Swap History",
    element: <SwappingHistory />,
  },
  {
    name: "Selling History",
    element: <Selling_History />,
  },
  {
    name: "Buying History",
    element: <Buying_History />,
  },
];

const History = () => {
  const { address } = useAccount();

  const [data, setData] = React.useState({
    id: "0",
    element: <SwappingHistory />,
  });
  const handleSubmit = (id, element) => {
    setData((x) => {
      return { ...x, id, element };
    });
  };

  const { handleChange, input } = useContext(HistoryApi);

  return (
    <>
      <BgPhoto
        image="https://images.unsplash.com/photo-1533749047139-189de3cf06d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmV3aW5kJTIwdGltZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        Topic="See your History"
      />
      <HistorySearch handleChange={handleChange} />
      <div className="changeContainer">
        {historyData.map((items, index) => {
          return (
            <div
              className={index == data.id ? "actives" : ""}
              onClick={() => handleSubmit(index, items.element)}
            >
              {items.name}
            </div>
          );
        })}
      </div>
      {data.element}
    </>
  );
};

export default History;
