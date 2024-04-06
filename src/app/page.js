import A from "@/components/a";
import H1 from "@/components/h1";
import H2 from "@/components/h2";
import H3 from "@/components/h3";
import LeagueButton from "@/components/leagueButton";
import P from "@/components/p";

export default function Home() {
  return (
    <>
      <header className="p-3 lg:p-0 my-16 mx-auto max-w-4xl">
        <H1 text={"welcome"} className={"text-primary text-center pb-10"}/>
        <H3 text={"looking"} className={"pb-2 text-center"}/>
        <div className="flex gap-1 justify-center">
          <P text={"check"}/>
          <A text={"below"} href={"#leagues"} className={"text-secondary underline md:text-center"}/>
        </div>
        <H3 text={"notKnow"} className={"text-center pb-2"}/>
        <div className="flex gap-1 justify-center">
          <P text={"watch"}/>
          <A text={"tutorial"} href={"#tutorial"} className={"text-secondary underline md:text-center"}/>
        </div>
      </header>
      <section className="p-3 lg:p-0 mx-auto max-w-4xl" id="leagues">
        <H2 text={"available"}/>
        <div>
          <LeagueButton></LeagueButton>
        </div>
      </section>
    </>
  );
}
