import React from "react";
import "./Styles/HistorySearch.css";
const HistorySearch = ({ handleChange }) => {
  return (
    <>
      <div className="historyInput">
        <form>
          <input
            className="address"
            name="address"
            type="text"
            onChange={handleChange}
            placeholder="Enter Address"
          />
        </form>
      </div>
    </>
  );
};

export default HistorySearch;
