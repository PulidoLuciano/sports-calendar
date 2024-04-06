import H2 from "@/components/h2";
import TeamItem from "@/components/teamItem";
import { fetchTeamsByLeague, fetchLeagueById } from "@/utils/dbFetching";

export default async function Page({params}){
    const leagueId = params.leagueId;
    const league = await fetchLeagueById(leagueId);
    const teams = await fetchTeamsByLeague(leagueId);

    return(
        <>
            <header className="flex flex-col text-center md:flex-row md:text-balance items-center justify-center gap-6 p-3 mt-6 lg:p-0 mx-auto max-w-4xl">
                <img src={league.logo} alt={`${league.name} logo`} className="max-h-60"/>
                <h1>{league.name}</h1>
            </header>
            <section className="p-3 mt-6 mb-6 lg:p-0 mx-auto max-w-4xl">
                {teams.map((team) => <TeamItem name={team.name} logo={team.logo}/>)}
            </section>
        </>
    )
}