import axios from "axios";

export async function uploadToPinata(jsonData: any) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const pinataJWT =
    process.env.NEXT_PUBLIC_PINATA_JWT ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTJkODg2My04NmJjLTQ5NDUtYTc3ZS1hZmFmMzcxNjFiM2QiLCJlbWFpbCI6ImNhc2FhcmxhaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzg4ZDk0YmMzNjU2NjMxYWZmY2IiLCJzY29wZWRLZXlTZWNyZXQiOiI0NjQwMWNiYWYxODZmNTU5MGYzY2VmNWE5Y2MwMmE1OGU2NDU4NWVkYjc4YzA1YWViNDQ1Y2Q1YTIxMjBiMjEwIiwiZXhwIjoxNzU4NDMwMDIyfQ.w3wfKI4Dk2NpgSy_-iQEzI700v_p1eD7FD71kXag0E8";

  const { data } = await axios.post(
    url,
    {
      // assuming client sends `nftMeta` json
      pinataContent: jsonData,
    },
    {
      headers: {
        Authorization: `Bearer ${pinataJWT}`,
      },
    },
  );

  return data.IpfsHash;
}

export async function getFilesFromPinata() {
  const url = `https://api.pinata.cloud/v3/files`;
  const pinataJWT = process.env.NEXT_PUBLIC_PINATA_JWT || "";

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${pinataJWT}`,
    },
  });

  return data;
}

export async function getDataFromPinata(hash: string) {
  const url = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY || "https://gateway.pinata.cloud"}/ipfs/${hash}`;
  const { data } = await axios.get(url);
  return data;
}
