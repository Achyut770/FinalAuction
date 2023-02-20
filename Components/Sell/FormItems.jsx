import React, { useContext } from "react";
import "./FormItem.css";

import { inputData } from "../../data";
import useSellAuctionEth from "../../hooks/Auction/useSellAuctionEth";
import fileToIpfs from "../../Utils/fileToIpfs";
import Loader from "../ForAll/Loader";
import signer from "../../ContextApi/signer";
import { toast } from "react-toastify";
import useSellAuctionToken from "../../hooks/Auction/useSellAuctionToken";
import tokenData from "../../Data/TokenData";

const FormItems = ({ handleChange, input, setInput }) => {
  const [loading, setLoading] = React.useState(false);
  const { sellItemWithEth } = useSellAuctionEth(input);
  const { sellItemWithToken } = useSellAuctionToken(input);
  const { fetchData } = useContext(signer);
  const [dropDownShow, setDropDownShow] = React.useState(false);
  const [firstDropdown, setFirstDropdown] = React.useState(tokenData[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.image) return toast.error("Plz add image");

    try {
      setLoading(() => true);
      const image = await fileToIpfs(input.image);
      setInput((x) => {
        return { ...x, image };
      });
    } catch (error) {
      setLoading(() => false);
      toast.error("Something Went Wrong");
    }
  };

  const sellTheItem = async () => {
    try {
      if (input.eth === "true") {
        await sellItemWithEth();
      } else {
        await sellItemWithToken();
      }
      setLoading(() => false);
      fetchData();
      toast.success("Successfully added");
    } catch (error) {
      toast.error("Something Went Wrong");
      setLoading(() => false);
    }
  };

  const handleClick = (items) => {
    setDropDownShow((x) => !x);
    setFirstDropdown(() => items);
    setInput((x) => {
      return {
        ...x,
        eth: items.address,
      };
    });
  };

  React.useEffect(() => {
    if (!loading) return;
    sellTheItem();
  }, [input.image]);

  return (
    <>
      {loading && <Loader />}
      <section className="makeAuctionContainer">
        <div className="form_Section_Left">
          <img
            src="https://www.shutterstock.com/image-vector/online-auction-on-smartphone-screen-600w-1968687439.jpg"
            className="formItem_Image"
          />
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="input_Container">
            {inputData.map((items, index) => {
              return (
                <div>
                  <label>
                    <div className="input_Topic">{items.topic}:</div>
                    {items.type == "file" && (
                      <div className="Upload">
                        <i className="fa-solid fa-upload fa-2x"></i>
                      </div>
                    )}
                    {items.name === "image" ? (
                      <div>
                        <input
                          name={items.name}
                          type={items.type}
                          onChange={handleChange}
                        />
                        &nbsp; {input.image && <div>{input.image.name}</div>}
                      </div>
                    ) : (
                      <input
                        name={items.name}
                        type={items.type}
                        onChange={handleChange}
                        required
                        value={input[items.name]}
                      />
                    )}
                  </label>
                </div>
              );
            })}
            <div className="tokenAndEthDropdown">
              <div className="optionDropdown">
                {dropDownShow
                  ? tokenData.map((items, index) => {
                      if (items.name === firstDropdown.name) return;
                      return (
                        <div
                          key={index}
                          value={items.address}
                          className="dropdownIndv"
                          onClick={() => handleClick(items)}
                        >
                          <img
                            className="tokenAndEthImages"
                            src={items.image}
                            alt={items.name}
                          />
                          {items.name}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div
                value={firstDropdown.address}
                onClick={() => setDropDownShow((x) => !x)}
                className="dropdownIndv"
              >
                <img
                  className="tokenAndEthImages"
                  src={firstDropdown.image}
                  alt={firstDropdown.name}
                />
                {firstDropdown.name}
                &nbsp; <i class="fa-solid fa-arrow-down"></i>
              </div>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
};

export default FormItems;
