"use client";

import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { useAccount } from "wagmi";
import { uploadToPinata } from "~~/utils/pinata";
import { notification } from "~~/utils/scaffold-eth";

export default function DinkoismEditArticlePage() {
  const account = useAccount();

  const handleSubmitProposal = async () => {
    const proposal = {
      articleSlug: "dinokism",
      articleBody: newText,
      proposedOn: new Date().toISOString(),
      proposedBy: account.address,
    };

    try {
      const ipfsHash = await uploadToPinata(proposal);
      console.log("Uploaded proposal to IPFS:", ipfsHash);
      notification.success("Proposal submitted successfully");
    } catch (error) {
      console.error("Failed to upload proposal to IPFS:", error);
      notification.error("Failed to submit proposal");
    }
  };

  const oldText = `Dinkoism (/ˈdɪnkɔɪzəm/), the Dinkoist religion, or Dinkamatham is a parody religion and social movement that emerged and evolved on social networks[4] organized by independent welfare groups in the Indian state of Kerala. Adherents describe Dinkoism as a genuine religion.
        According to a report in India Today, Dinkoism[4] was established in 2008 in Kerala by a group of rationalists with the intention of ridiculing "the absurdity of blind religious faith".[5] The community planned to become politically active.[6] A report in The New Indian Express said Dinkoism is gaining members through Facebook.[4] The BBC described Dinkoism in 2016 as an atheist movement with significant growth on social media.[7]
        The religion purports to worship Dinkan, a comic book character.[8] Dinkoists celebrate the character—a superhero mouse that appeared in 1983 in defunct Malayalam-language children's magazine Balamangalam—as their God for the purpose of exposing superstitions and fallacies and practices of traditional religions.[7][9]`;

  const [step, setStep] = useState("edit");
  const [newText, setNewText] = useState(oldText);

  return (
    <div className="p-20">
      <div className="border-b border-emerald-800 flex justify-between pb-2">
        <h5 className="text-2xl font-serif">Editing Dinkoism</h5>
        {step === "edit" && (
          <button
            onClick={() => setStep("diff")}
            disabled={oldText === newText}
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
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
      )}
      {step === "diff" && (
        <div className="mt-4">
          <ReactDiffViewer oldValue={oldText} newValue={newText} splitView={true} useDarkTheme={true} />
        </div>
      )}
    </div>
  );
}
