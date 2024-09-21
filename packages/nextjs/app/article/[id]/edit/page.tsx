"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactDiffViewer from "react-diff-viewer";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { uploadToPinata } from "~~/utils/pinata";
import { getDataFromPinata } from "~~/utils/pinata";
import { notification } from "~~/utils/scaffold-eth";

export default function EditArticlePage() {
  const account = useAccount();
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const resourceId = id as string;

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "CLR",
    functionName: "updateProposedVersion",
    args: [resourceId, undefined],
  });

  const handleSubmitProposal = async () => {
    const proposal = {
      articleSlug: resourceId,
      articleBody: newText,
      proposedOn: new Date().toISOString(),
      proposedBy: account.address,
    };

    try {
      const ipfsHash = await uploadToPinata(proposal);

      await writeAsync({ args: [resourceId, ipfsHash] });

      notification.success("Proposal submitted successfully");
    } catch (error) {
      console.error("Failed to submit proposal:", error);
      notification.error("Failed to submit proposal");
    }
  };

  const [step, setStep] = useState("edit");
  const [newText, setNewText] = useState<string>(article || "");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromPinata("QmcVhYZD31eqMUcnZkd83Tg2hEWhfmEAjVmLVmJnUV8sMB");
      setArticle(data);
      setNewText(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-20">
      <div className="border-b border-emerald-800 flex justify-between pb-2">
        <h5 className="text-2xl font-serif">Editing {id}</h5>
        {step === "edit" && (
          <button
            onClick={() => setStep("diff")}
            disabled={article === newText}
            className="btn btn-primary btn-sm rounded"
          >
            View diff
          </button>
        )}
        {step === "diff" && (
          <button onClick={handleSubmitProposal} className="btn btn-primary btn-sm rounded">
            Submit proposal
          </button>
        )}
      </div>
      {step === "edit" && (
        <textarea
          className="textarea textarea-bordered w-full rounded h-64 mt-4 text-md"
          value={newText || ""}
          onChange={e => setNewText(e.target.value)}
        />
      )}
      {step === "diff" && (
        <div className="mt-4">
          <ReactDiffViewer oldValue={article || ""} newValue={newText || ""} splitView={true} useDarkTheme={true} />
        </div>
      )}
    </div>
  );
}
