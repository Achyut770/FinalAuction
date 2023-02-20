import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import History from "../Pages/History";
import React from "react";
import Navbar from "../Components/ForAll/Navbar";
import Footer from "../Components/ForAll/footer";
import Bid from "../Pages/Bid";
import MakeAuction from "../Pages/MakeAuction";
import Swap from "../Pages/Swap";
import HistoryHandler from "../Children/Hisatory";
import IndvNft from "../Pages/IndvBid";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  let routesElement = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/events",
      element: (
        <HistoryHandler>
          <History />
        </HistoryHandler>
      ),
    },
    {
      path: "/bid",
      element: <Bid />,
    },
    {
      path: "/MakeAuction",
      element: <MakeAuction />,
    },
    {
      path: "/swap",
      element: <Swap />,
    },
    {
      path: "yournft",
      element: <IndvNft />,
    },
  ];

  return (
    <>
      <Navbar />
      <Routes>
        {routesElement.map(({ path, element }, index) => {
          return path === "/" || "/bid" ? (
            <Route exact path={path} element={element} />
          ) : (
            <Route path={path} element={element} />
          );
        })}
      </Routes>
      <Footer />
      <ToastContainer
        z-index={4567}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
