import React from "react";
import "./Styles/Bgphoto.css";
const BgPhoto = ({ image, Topic }) => {
  return (
    <div className="bg_Container">
      <img src={image} alt="#" />
      <div className="bg_Topic">{Topic}</div>
    </div>
  );
};

export default BgPhoto;
