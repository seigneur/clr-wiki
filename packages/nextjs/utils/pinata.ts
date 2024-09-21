import axios from "axios";

export async function uploadToPinata(jsonData: any) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const pinataJWT = process.env.NEXT_PUBLIC_PINATA_JWT || "";

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
