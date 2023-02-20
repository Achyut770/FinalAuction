import React from "react";
import BgPhoto from "../Components/ForAll/BgPhoto";
import FormItems from "../Components/Sell/FormItems";
import checkNotaNumber from "../Utils/CheckNumber";

const MakeAuction = () => {
  const [input, setInput] = React.useState({
    eth: "true",
    EndingDate: "",
    startingPrice: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(input);
    if (name == "startingPrice") {
      if (checkNotaNumber(value)) return;
    }

    setInput((x) => {
      return { ...x, [name]: name === "image" ? files[0] : value };
    });

    console.log(input);
  };

  //QmYBnRhg35FRnoqv2GkkSMoD7VaGzmnBSKiCyVkYckh241
  return (
    <>
      <div>
        <BgPhoto
          image="https://media.istockphoto.com/id/917901978/photo/gavel-on-auction-word.jpg?b=1&s=612x612&w=0&k=20&c=RHgX8PpaaYpOviP5d1DZovpgqu6FXiVgmlhZRRFA24M="
          Topic="Sale Your item"
        />
      </div>
      <FormItems
        handleChange={handleChange}
        input={input}
        setInput={setInput}
      />
    </>
  );
};

export default MakeAuction;
