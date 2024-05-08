import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { asyncMe, authState } from "../redux/reducers/authSlice";
import { Fragment, useEffect } from "react";
import GetLayout from "../components/layout/GetLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Thread from "../pages/Thread";
import ThreadDetail from "../pages/detail";
import CreateThread from "../pages/CreateThread";
import Leaderboard from "../pages/Leaderborad";


export default function Routers() {
    const dispatch = useDispatch();

    const { user, token } = useSelector(authState);

    useEffect(() => {
        if (token && !user) {
            dispatch(asyncMe());
        }
    }, [token, user])

    return (
        <>
            <GetLayout>
                <Routes>
                    {user === null && (
                        <Fragment>
                            <Route path="/*" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Fragment>
                    )}

                    <Route path="/" element={<Thread />} />
                    <Route path="/thread/detail/:id" element={<ThreadDetail />} />
                    <Route path="/thread/create" element={<CreateThread />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<div>page tidak ada</div>} />
                </Routes>
            </GetLayout>
        </>
    )
}