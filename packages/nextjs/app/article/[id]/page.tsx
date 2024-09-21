"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getDataFromPinata } from "~~/utils/pinata";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromPinata("QmcVhYZD31eqMUcnZkd83Tg2hEWhfmEAjVmLVmJnUV8sMB");
      setArticle(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-20">
      <div className="border-b border-emerald-800 flex justify-between pb-2">
        <h5 className="text-2xl font-serif">{id}</h5>
        <Link href={`/article/${id}/edit`}>
          <button className="btn btn-primary btn-sm rounded">Propose edit</button>
        </Link>
      </div>
      <p className="mt-4">{article}</p>
    </div>
  );
}
