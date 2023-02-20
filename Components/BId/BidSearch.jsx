import React from "react";
import "./BidSearch.css";
const BidSearch = ({ handleSubmit, handleChange }) => {
  return (
    <div className="bid_Search">
      <div className="search_Topic">
        <b>Search The Item You Are looking For.</b>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search Item from Token Id "
            required
          />
        </label>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

export default BidSearch;
