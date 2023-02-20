import React from "react";
import SignerApi from "../ContextApi/signer";
import ReadData from "../hooks/ReadERC721Token";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

const SignerAndDataChildren = ({ children }) => {
  const { address } = useAccount();
  const [data, setData] = React.useState([]);
  const [indvData, setIndvData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { dataFetching, fetchingIndvData } = ReadData();

  const fetchData = async () => {
    try {
      setLoading(() => true);
      const { array, indvArray } = await dataFetching(address);

      setData(() => [...array]);
      setIndvData(() => [...indvArray]);
      setLoading(() => false);
    } catch (err) {
      setLoading(() => false);
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [address]);
  const value = {
    data,
    fetchData,
    loading,
    indvData,
  };
  return <SignerApi.Provider value={value}>{children}</SignerApi.Provider>;
};

export default SignerAndDataChildren;
