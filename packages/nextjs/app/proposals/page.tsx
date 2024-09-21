"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { getFilesFromPinata } from "~~/utils/pinata";

const Proposals: NextPage = async () => {
  console.log(await getFilesFromPinata());

  return (
    <>
      <div className="lg:px-20 px-6">
        <h4 className="mt-8 mb-2 font-semibold text-lg">Most viewed proposals today</h4>
        <div className="flex flex-col gap-4">
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
