import React from "react";
import HistoryApi from "../ContextApi/History";
const HistoryHandler = ({ children }) => {
  const [input, setInput] = React.useState({});
  const handleChange = (e) => {
    setInput((x) => {
      return {
        ...x,
        [e.target.name]: e.target.value,
      };
    });
    console.log(input);
  };

  const value = {
    handleChange,
    input,
  };

  return <HistoryApi.Provider value={value}>{children}</HistoryApi.Provider>;
};

export default HistoryHandler;
