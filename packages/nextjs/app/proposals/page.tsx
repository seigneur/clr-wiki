"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getDataFromPinata } from "~~/utils/pinata";

const Proposals: NextPage = () => {
  const [newText, setNewText] = useState<string | null>(null);

  const { data: proposal } = useScaffoldContractRead({
    contractName: "CLR",
    functionName: "proposals",
    args: [BigInt(0)], // hardcoded to get the first proposal created
  });

  useEffect(() => {
    // Get text from IPFS for proposal
    const fetchProposal = async () => {
      if (proposal) {
        const data = await getDataFromPinata(proposal[0]);
        setNewText(data.articleBody);
      }
    };

    fetchProposal();
  }, [proposal]);

  return (
    <>
      <div className="lg:px-20 px-6">
        <h4 className="mt-8 mb-2 font-semibold text-lg">Most viewed proposals today</h4>
        <div className="flex flex-col gap-4">
          {proposal && (
            <Link href={`/proposal/${proposal[3]}`}>
              <div className="border-2 border-emerald-700 p-4 rounded shadow hover:scale-[1.01] transition cursor-pointer ease-in-out">
                <h5 className="font-semibold text-lg underline">{proposal[3]}</h5>
                <p className="mb-0">{newText ? `${newText.substring(0, 500)}...` : ""}</p>

                <p className="mb-0 text-sm opacity-75 italic">Proposed by {proposal[2]}</p>
              </div>
            </Link>
          )}
          <Link href="/proposal/dinko">
            <div className="border-2 border-emerald-700 p-4 rounded shadow hover:scale-[1.01] transition cursor-pointer ease-in-out">
              <h5 className="font-semibold text-lg underline">Dinkoism</h5>
              <p className="mb-0">
                Dinkoism (/ˈdɪnkɔɪzəm/), the Dinkoist religion, or Dinkamatham[3][2] is a parody religion and social
                movement that emerged and evolved on social networks[4] organized by independent welfare groups in the
                Indian state of Kerala. Adherents describe Dinkoism as a genuine religion.
              </p>
            </div>
          </Link>
          <Link href="/proposal/dinko">
            <div className="border-2 border-emerald-700 p-4 rounded shadow hover:scale-[1.01] transition cursor-pointer ease-in-out">
              <h5 className="font-semibold text-lg underline">Dinkoism</h5>
              <p className="mb-0">
                Dinkoism (/ˈdɪnkɔɪzəm/), the Dinkoist religion, or Dinkamatham[3][2] is a parody religion and social
                movement that emerged and evolved on social networks[4] organized by independent welfare groups in the
                Indian state of Kerala. Adherents describe Dinkoism as a genuine religion.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Proposals;
