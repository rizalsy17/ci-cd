import React from 'react'
import { useSelector } from 'react-redux';

export default function LeaderboardList({ leaderboards }) {
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            {leaderboards?.map((item) => (
                <div key={item?.user?.id} className="flex flex-row items-center justify-between px-1 sm:px-0">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src={item?.user?.avatar}
                            alt="avatar"
                            loading="lazy"
                            className="object-cover w-8 h-8 sm:w-10 sm:h-10"
                        />
                        <span className="text-xs font-medium capitalize sm:text-base text-slate-600">{item?.user?.name}</span>
                        {
                            user && user.id === item?.user?.id && (<p className="font-bold">(You)</p>)
                        }
                    </div>
                    <span className="text-xs font-medium sm:text-base text-slate-600">{item?.score}</span>
                </div>
            ))
            }
        </>
    )
}