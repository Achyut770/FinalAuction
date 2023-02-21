import axios from "axios";
import React from "react";
const fileToIpfs = async (File) => {
  const fd = new FormData();
  fd.append("file", File);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    fd,
    {
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization:
          "Bearer ",
      },
    }
  );

  return res.data.IpfsHash;
};

//Qmf6GfpVyXVMFH9KAgmcaNVSkEJv5DR5Hg1L5tMtJsyj5X
export default fileToIpfs;
