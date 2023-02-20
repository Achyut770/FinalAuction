import React from "react";
import "../Styles/Home.css";
import ShortCutBids from "../Components/ForAll/shortCutBids";
import { useContext, useState, useEffect } from "react";
import signer from "../ContextApi/signer";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { data } = useContext(signer);
  const [prevData, setPrevData] = useState([]);

  const router = useNavigate();

  useEffect(() => {
    let datas = [];
    try {
      data.reverse().map((items, index) => {
        if (index < 4) {
          datas.push(items);
        }
      });
      setPrevData(datas);
    } catch (err) {
      console.log(err);
    }
  }, [data]);
  return (
    <>
      <div
        className="home_Container"
        onClick={() => console.log(data?.data?.datas)}>
        <div className="home_Left">
          <div>VIRTUAL AUCTION</div>
          <div className="home_Big">
            Authentic and secure decentralized blockchain auction
          </div>
          <div className="sub_Sologan">
            A decentralized blockchain marketplace providing secure and
            authentic transactions. Transactions are transparent and
            tamper-proof, thanks to the immutable nature of blockchain and smart
            contracts.
          </div>
          <div className="button_Container">
            <button className="contact_Us">
              <a href="tel:9817589348">Contact Us</a>
            </button>
            <button className="getStarted" onClick={() => router("/bid")}>
              Get Started
            </button>
          </div>
        </div>
        <div className="home_right">
          <img
            src="https://media.istockphoto.com/id/1322440587/photo/nft-non-fungible-token-crypto-currency-regulation-lawyer-technology.jpg?b=1&s=170667a&w=0&k=20&c=4oJSFZ-7KI9s_EXV_Es5swO_1nh6H7d2thdU8WOBV1U="
            alt="Image"
          />
        </div>
      </div>
      <ShortCutBids normalOrTrending="Top Items" data={prevData} top />
      {/* <ShortCutBids normalOrTrending="Trending Items" top data={prevData} /> */}
    </>
  );
};

export default Home;
