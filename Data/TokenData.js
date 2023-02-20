const usdtImage = "https://i.ibb.co/f0cQXFN/USDT.png";
const daiImage = "https://i.ibb.co/zPKqDWv/dai.jpg";
const tokenData = [
  {
    name: "ETH",
    address: "eth",
    image: "https://i.ibb.co/Lpcx7p8/ethereum.png",
    decimal: 18,
  },
  {
    name: "A_CR7",
    address: "0xD68906dB6cc9B1965Df0C9239c11d8Fb97512325",
    image: "https://i.ibb.co/Bw1VdLx/Ronaldo.jpg",
    decimal: 18,
  },
  {
    name: "USDC",
    address: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
    image: "https://i.ibb.co/bj08Lkn/USDC.png",
    decimal: 6,
  },
  {
    name: "USDT",
    address: "0xf7f730ffaec85455e3ba44f488c2bd2a741953b3",
    image: usdtImage,
    decimal: 6,
  },
  {
    name: "Dai",
    address: "0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253",
    image: daiImage,
    decimal: 6,
  },
];

export const tokenDataWithAddress = {
  "0xD68906dB6cc9B1965Df0C9239c11d8Fb97512325": [
    "A_CR7",
    "https://i.ibb.co/Bw1VdLx/Ronaldo.jpg",
    18,
  ],
  "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747": [
    "USDC",
    "https://i.ibb.co/bj08Lkn/USDC.png",
    18,
  ],
  "0xf7f730ffaec85455e3ba44f488c2bd2a741953b3": ["USDT", usdtImage, 6],
  "0xd393b1E02dA9831Ff419e22eA105aAe4c47E1253": ["Dai", daiImage, 6],
};

export default tokenData;
