import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Styles/Navbar.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export let navLink = [
  {
    to: "/bid",
    name: "Bid",
  },
  {
    to: "/makeauction",
    name: "Create",
  },
  {
    to: "/events",
    name: "History",
  },
  {
    to: "/swap",
    name: "Swap",
  },
  {
    to: "/yournft",
    name: "Your Nft's",
  },
];

export default function Navbar() {
  const [res, setRes] = React.useState(true);

  const navigate = useNavigate();

  return (
    <>
      <section className="main_Nav">
        <nav className="Nabvar_Container">
          <div className="navbar_Left">
            <div
              className="logo"
              onClick={() => {
                navigate("/"), setRes(true);
              }}
            >
              <span className="logo_Big">Auction </span>
              <span className="logo_Small">Hub</span>
            </div>
            <div
              className={
                res ? "linkContainer" : "linkContainer reslinkContainer"
              }
              onClick={() => setRes(true)}
            >
              {navLink.map((items, index) => {
                return (
                  <NavLink to={items.to} className="link">
                    {items.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div
            className={
              res ? "bookMarksConnect" : "bookMarksConnect resbookMarksConnect"
            }
            onClick={() => setRes(true)}
          >
            {/* {!value.signers?._address ? (
              <button onClick={() => connectMetaMask()}>Connects</button>
            ) : (
              <button>
                {" "}
                {value?.signers?._address.slice(0, 5)}...
                {value?.signers?._address.slice(38, 42)}{" "}
              </button>
            )} */}
            <ConnectButton />
          </div>
        </nav>
        <div className="ham" onClick={() => setRes((x) => !x)}>
          {res ? (
            <i className="fa-solid fa-bars fa-2x"></i>
          ) : (
            <i className="fa-solid fa-xmark fa-2x"></i>
          )}
        </div>
      </section>
      <div style={{ height: "60px" }}></div>
    </>
  );
}
