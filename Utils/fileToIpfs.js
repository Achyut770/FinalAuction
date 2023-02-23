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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZjk0ZjEzOC01OGQ5LTQ2MWEtYjFlNi0yZjkyZTY5MTNhYmEiLCJlbWFpbCI6ImFjaHl1dDMxM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzdlZTEyM2ZhZWNjOTdhNjQ3YzciLCJzY29wZWRLZXlTZWNyZXQiOiJmOTM0MjFiYjVjYmE4Y2EzMmI1ZTUxOGVkZTM3MWFhNzJkNzZhZmJjYzY0MjU0ODVmNGEyMzg4MWQ3NzM1MTNkIiwiaWF0IjoxNjczMDE2NjgyfQ.UYgGDcvG-3YDt3aobMtbdE7Ctw5pU3DtnzZxpslFQGE",
      },
    }
  );

  return res.data.IpfsHash;
};

//Qmf6GfpVyXVMFH9KAgmcaNVSkEJv5DR5Hg1L5tMtJsyj5X
export default fileToIpfs;
