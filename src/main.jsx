import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SignerAndDataChildren from "../Children/SignerAndDataChildren";
import { HashRouter } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [polygonMumbai],




  [alchemyProvider({ apiKey: "" }), publicProvider()]



);

const { connectors } = getDefaultWallets({
  appName: "Auction Hub",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      coolMode //<<<<<<<< coolMode
    >
      <HashRouter>
        <SignerAndDataChildren>
          <App />
        </SignerAndDataChildren>
      </HashRouter>
    </RainbowKitProvider>
  </WagmiConfig>
);
