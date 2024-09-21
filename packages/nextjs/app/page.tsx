"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-emerald-800 lg:px-20 lg:py-20 py-10 px-6">
        <h3 className="font-serif text-4xl">Cleer</h3>
        <p className="opacity-75 text-sm font-light mt-0">Lorem ipsum</p>
      </div>
      <div className="lg:px-20 lg:py-20 py-10 px-6">
        <h4 className="mt-8 mb-2 font-semibold text-lg">Most edited articles this week</h4>
        <div className="flex flex-col gap-6">
          <div className="border-2 border-emerald-700 p-4 rounded shadow hover:scale-[1.01] transition cursor-pointer ease-in-out">
            <h5 className="font-semibold text-lg underline">Dinkoism</h5>
            <p className="mb-0">
              Dinkoism (/ˈdɪnkɔɪzəm/), the Dinkoist religion, or Dinkamatham[3][2] is a parody religion and social
              movement that emerged and evolved on social networks[4] organized by independent welfare groups in the
              Indian state of Kerala. Adherents describe Dinkoism as a genuine religion.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
