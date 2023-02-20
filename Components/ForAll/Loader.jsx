import React from "react";
import "./Styles/Loader.css";

const Loader = () => {
  console.log("asd");
  return (
    <>
      <div className="loaderContainer"></div>
      <div className="actualLoaderContainer">
        <img
          className="loader_Image"
          src="data:image/png;base64,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"
        />
      </div>
    </>
  );
};

export default Loader;