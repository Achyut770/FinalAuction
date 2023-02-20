import React from "react";
import "./SwapContainer.css";
import useConvertEthToToken from "../../hooks/Swap/useConvertEthToToken";
import Loader from "../ForAll/Loader";
import checkNotaNumber from "../../Utils/CheckNumber";
import useConvertTokenToEth from "../../hooks/Swap/useConvertTokenToEth";
import convertEtherToWei from "../../Utils/ConvertEtherToWei";
import instances from "../../Utils/ContractWagmiInstance";
import convertWeiToEther from "../../Utils/ConvertyWeiTiEther";
import { evaluate } from "mathjs";
import { toast } from "react-toastify";
import { erc20Address } from "../../Utils/Address";
const options = [
  { value: "Eth", label: "Eth" },
  { value: "A_CR7", label: "A_CR7" },
];

let swap = {
  Eth: "A_CR7",
  A_CR7: "Eth",
};

const SwapContainer = () => {
  const { swapContractInstance } = instances(erc20Address);
  const [loader, setLoader] = React.useState(false);
  const ethToToken = useConvertEthToToken();
  const tokenToEth = useConvertTokenToEth();
  const [reserve0, setReserve1] = React.useState();
  const [reserve1, setReserve2] = React.useState();
  const [input, setInput] = React.useState({
    from_Value: "",
    to_Value: "",
    to: "A_CR7",
  });

  const fetchTokenBalanceAndEtherBalance = async () => {
    const tokenBalance = await swapContractInstance.reserve0();
    setReserve1(convertWeiToEther(tokenBalance));
    const etherBalance = await swapContractInstance.reserve1();
    setReserve2(convertWeiToEther(etherBalance));
  };

  const setValue = (
    nameOfInput,
    nameOfInputToBeChanged,
    valueOfCurrentInput,
    fromValue,
    toValue
  ) => {
    if (!valueOfCurrentInput)
      return setInput((x) => {
        return { ...x, to_Value: 0, from_Value: 0 };
      });
    let finalTo =
      (evaluate(valueOfCurrentInput) * Number(toValue)) /
      (Number(fromValue) + evaluate(valueOfCurrentInput));
    setInput((x) => {
      return {
        ...x,
        [nameOfInput]: valueOfCurrentInput,
        [nameOfInputToBeChanged]: finalTo,
      };
    });
  };

  React.useState(() => {
    fetchTokenBalanceAndEtherBalance();
  }, []);

  const resetInputs = () => {
    setInput((x) => {
      return { ...x, from_Value: "", to_Value: "", to: "A_CR7" };
    });
  };

  const handleChange = (e) => {
    if (e.target.type === "text") {
      if (checkNotaNumber(e.target.value)) return;
    }
    if (e.target.name === "to") {
      setInput((x) => {
        return {
          ...x,
          from: swap[e.target.value],
          [e.target.name]: e.target.value,
        };
      });
    }
    if (e.target.name === "from") {
      setInput((x) => {
        return {
          ...x,
          to: swap[e.target.value],
          [e.target.name]: e.target.value,
        };
      });
    }
    if (e.target.name === "from_Value") {
      if (input.to === "Eth") {
        setValue(e.target.name, "to_Value", e.target.value, reserve0, reserve1);
      }
      if (input.to === "A_CR7") {
        setValue(e.target.name, "to_Value", e.target.value, reserve1, reserve0);
      }
    }
    if (e.target.name === "to_Value") {
      if (input.to === "Eth") {
        setValue(
          e.target.name,
          "from_Value",
          e.target.value,
          reserve1,
          reserve0
        );
      }
      if (input.to === "A_CR7") {
        setValue(
          e.target.name,
          "from_Value",
          e.target.value,
          reserve0,
          reserve1
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(() => true);

    if (input.to === "A_CR&") {
      const res = await ethToToken(convertEtherToWei(input.from_Value));
      if (res) {
        toast.success("Successfully swaped ether to token");
        setLoader(() => false);
        return resetInputs();
      }
      toast.error("Something Went Wrong");
      setLoader(() => false);
    }
    if (input.to === "Eth") {
      const res = await tokenToEth(convertEtherToWei(input.from_Value));
      if (res) {
        toast.success("Successfully swaped ether to token");
        setLoader(() => false);
        return resetInputs();
      }
      toast.error("Something Went Wrong");
      setLoader(() => false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <form onSubmit={handleSubmit} className="swapContainer">
        <div>Swap</div>
        <div className="input_Container">
          <div className="input_Dropdown">
            <div>
              <input
                name="from_Value"
                type="text"
                onChange={handleChange}
                value={input.from_Value}
                required
              />
            </div>
            <div>
              <select value={input.from} name="from" onChange={handleChange}>
                {options.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input_Dropdown">
            <input
              name="to_Value"
              type="text"
              value={input.to_Value}
              onChange={handleChange}
              required
            />
            <select value={input.to} name="to" onChange={handleChange}>
              {options.reverse().map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit">Swap</button>
      </form>
    </>
  );
};

export default SwapContainer;
