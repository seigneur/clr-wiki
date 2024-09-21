import Link from "next/link";

export default function DinkoismArticlePage() {
  return (
    <div className="p-20">
      <div className="border-b border-emerald-800 flex justify-between pb-2">
        <h5 className="text-2xl font-serif">Dinkoism</h5>
        <Link href="/article/dinkoism/edit">
          <button className="btn btn-primary btn-sm rounded">Propose edit</button>
        </Link>
      </div>
      <p className="mt-4">
        Dinkoism, the Dinkoist religion, or Dinkamatham is a parody religion and social movement that emerged and
        evolved on social networks[4] organized by independent welfare groups in the Indian state of Kerala. Adherents
        describe Dinkoism as a genuine religion. According to a report in India Today, Dinkoism[4] was established in
        2008 in Kerala by a group of rationalists with the intention of ridiculing &apos;the absurdity of blind
        religious faith&apos;.[5] The community planned to become politically active.[6] A report in The New Indian
        Express said Dinkoism is gaining members through Facebook.[4] The BBC described Dinkoism in 2016 as an atheist
        movement with significant growth on social media.[7] The religion purports to worship Dinkan, a comic book
        character.[8] Dinkoists celebrate the character—a superhero mouse that appeared in 1983 in defunct
        Malayalam-language children&apos;s magazine Balamangalam—as their God for the purpose of exposing superstitions
        and fallacies and practices of traditional religions.[7][9]
      </p>
    </div>
  );
}
