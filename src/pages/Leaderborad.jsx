import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncLeaderboard, leaderboardState } from "../redux/reducers/leaderboardSlice";
import UseLoadingbar from "../hooks/useLoadingbar";
import LeaderboardList from "../components/leaderboard/LeaderboardList";

export default function Leaderboard() {
    const dispatch = useDispatch();

    const { leaderboards, loading } = useSelector(leaderboardState);

    UseLoadingbar(loading);

    useEffect(() => {
        dispatch(asyncLeaderboard());
    }, []);

    return (
        <section className="container px-4 sm:px-28">
            <div className="flex flex-col gap-4 xl:gap-6">
                <h1 className="m-0 text-base font-bold capitalize xl:text-xl text-slate-700">klasmen pengguna aktif</h1>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-sm capitalize text-slate-500">pengguna</span>
                        <span className="text-sm capitalize text-slate-500">skor</span>
                    </div>

                    <LeaderboardList leaderboards={leaderboards} />
                </div>
            </div>
        </section>
    )
}