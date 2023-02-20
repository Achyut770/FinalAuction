import { useAccount } from "wagmi";
import instances from "../../Utils/ContractWagmiInstance";
import React from "react";

const useHistoryData = async (input, setData, setLoader, name) => {
  const { address } = useAccount();

  const { swapContractInstance, auctionContractInstance } = instances();

  const fetchData = async () => {
    if (!address) return;
    try {
      setLoader(() => true);
      let msgSender = !input.address ? address : input?.address;
      let filters;
      let filter;
      switch (name) {
        case "swap":
          filters = swapContractInstance.filters.SwapEvent(
            msgSender,
            null,
            null,
            null
          );
          break;
        case "sell":
          filters = auctionContractInstance.filters.soldAuctionToken(
            msgSender,
            null,
            null,
            null
          );
          filter = auctionContractInstance.filters.soldAuctionEth(
            msgSender,
            null,
            null,
            null
          );
          break;
        case "buy":
          filters = auctionContractInstance.filters.boughtAuction(
            null,
            msgSender,
            null,
            null
          );
      }
      let events;
      let event;
      switch (name) {
        case "swap":
          events = await swapContractInstance.queryFilter(filters);
          break;
        case "buy":
          events = await auctionContractInstance.queryFilter(filters);
          break;
        case "sell":
          event = await auctionContractInstance.queryFilter(filter);
          events = await auctionContractInstance.queryFilter(filters);
      }
      console.log(events);
      let datas = [];
      events.map((items) => {
        datas.push(items?.args);
      });
      if (name === "sell") {
        console.log("ca");
        event.map((items) => {
          console.log(items);
          datas.push(items?.args);
        });
      }
      console.log(datas);
      setData(() => [...datas]);
      console.log("events", datas);
      setLoader(() => false);
    } catch (error) {
      console.log(error);
      setLoader(() => false);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [address, input]);
};

export default useHistoryData;
