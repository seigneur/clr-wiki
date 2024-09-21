"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RegisterButton from "./_components/RegisterButton";
import type { NextPage } from "next";
import { getDataFromPinata } from "~~/utils/pinata";

const Home: NextPage = () => {
  const [article, setArticle] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Hard coded to get singapore article
      const data = await getDataFromPinata("QmcVhYZD31eqMUcnZkd83Tg2hEWhfmEAjVmLVmJnUV8sMB");
      setArticle(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-emerald-800 lg:px-20 lg:py-10 py-4 px-6">
        <div className="">
          <h3 className="font-serif text-4xl">clr</h3>
          <p className="opacity-75 text-sm font-light mt-0">
            Collusion resistant Information dispute resolution using MACI
          </p>
        </div>
        <RegisterButton />
      </div>
      <div className="lg:px-20 px-6">
        <h4 className="mt-8 mb-2 font-semibold text-lg">Most edited articles this week</h4>
        <div className="flex flex-col gap-4">
          <Link href="/article/singapore">
            <div className="border-2 border-emerald-700 p-4 rounded shadow hover:scale-[1.01] transition cursor-pointer ease-in-out">
              <h5 className="font-semibold text-lg underline">Singapore</h5>
              <p className="mb-0">{article ? `${article.slice(0, 600)}...` : "Loading..."}</p>
            </div>
          </Link>
          <Link href="/article/singapore">
            <div className="border-2 border-emerald-700 p-4 rounded shadow hover:scale-[1.01] transition cursor-pointer ease-in-out">
              <h5 className="font-semibold text-lg underline">Singapore</h5>
              <p className="mb-0">{article ? `${article.slice(0, 600)}...` : "Loading..."}</p>
            </div>
          </Link>
          <Link href="/article/singapore">
            <div className="border-2 border-emerald-700 p-4 rounded shadow hover:scale-[1.01] transition cursor-pointer ease-in-out">
              <h5 className="font-semibold text-lg underline">Singapore</h5>
              <p className="mb-0">{article ? `${article.slice(0, 600)}...` : "Loading..."}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
