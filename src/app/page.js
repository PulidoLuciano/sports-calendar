import A from "@/components/a";
import H1 from "@/components/h1";
import H2 from "@/components/h2";
import H3 from "@/components/h3";
import LeagueButton from "@/components/leagueButton";
import P from "@/components/p";
import { fetchLeagues } from "@/utils/dbFetching";

export default async function Home() {
  const leagues = await fetchLeagues();
  
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {
            leagues.map((league) => <LeagueButton key={league.id} name={league.name} logo={league.logo} id={league.id}/>)
          }    
        </div>
      </section>
      <section className="mt-16 p-3 mb-16 lg:p-0 mx-auto max-w-4xl" id="tutorial">
        <H2 text={"howTo"} className={"mb-3"}/>
        <P text={"tutorial_one"}/>
        <ol className="list-decimal pl-8 pt-6 marker:font-bold marker:dark:text-white">
            <li className="pb-3"><P text={"step_one"}/></li>
            <li className="pb-3"><P text={"step_two"}/></li>
            <li className="pb-3"><P text={"step_three"}/></li>
            <li className="pb-3"><P text={"step_four"}/></li>
        </ol>
        <P text={"tutorial_two"} className={"mt-3"}/>
      </section> 
    </>
  );
}
