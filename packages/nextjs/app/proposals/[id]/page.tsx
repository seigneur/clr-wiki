"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactDiffViewer from "react-diff-viewer";
import PollDetail from "~~/components/PollDetail";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getDataFromPinata } from "~~/utils/pinata";

export default function ProposalPage() {
  const { id } = useParams();
  const [oldText, setOldText] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Hard coded to get singapore article
      const data = await getDataFromPinata("QmcVhYZD31eqMUcnZkd83Tg2hEWhfmEAjVmLVmJnUV8sMB");
      setOldText(data);
    };

    fetchData();
  }, []);

  interface Proposal {
    articleSlug: string;
    articleBody: string;
  }

  const [proposalObject, setProposalObject] = useState<Proposal | null>(null);
  const { data: proposal } = useScaffoldContractRead({
    contractName: "CLR",
    functionName: "proposals",
    args: [BigInt(Array.isArray(id) ? id[0] : id)],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (proposal && proposal[0]) {
        const data = await getDataFromPinata(proposal[0]);
        setProposalObject(data);
      }
    };

    if (proposal) {
      fetchData();
    }
  }, [proposal]);

  return (
    <div className="p-20">
      <div className="border-b border-emerald-800 flex justify-between pb-2 mb-4">
        {proposalObject && (
          <h5 className="text-2xl font-serif">Reviewing proposal for: {proposalObject.articleSlug}</h5>
        )}
        <div className="flex gap-4">
          {/* Hardcoded poll id */}
          <PollDetail id={BigInt(0)} />
        </div>
      </div>
      {oldText && proposalObject && (
        <ReactDiffViewer
          oldValue={oldText}
          newValue={proposalObject.articleBody}
          splitView={true}
          useDarkTheme={true}
        />
      )}
    </div>
  );
}
