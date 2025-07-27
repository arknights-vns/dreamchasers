"use client";

import type { ContestantInfo } from "@/lib/vns";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";

export default function PodiumPage() {
    const [data, setData] = useState<ContestantInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/contest")
            .then(res => res.json())
            .then((json) => {
                setData(json.message);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);

    return (
        <div className={"vns-background flex h-[100vh] flex-col"}>
            <PageTitle favorText={""} title={"STANDING"} />

            <div
                className={"flex flex-1/2 flex-col items-center justify-center space-y-4"}
                data-theme={"dark"}
            >
                {loading && <div>Loading...</div>}
                {!loading && error && <div>{error}</div>}
                {!loading && !error && (
                    <table
                        className={"table-auto border bg-black text-center text-white"}
                    >
                        <thead>
                            <tr>
                                <th className={"w-[300px] border p-8 text-6xl"}>Hạng</th>
                                <th className={"w-[300px] border p-8 text-6xl"}>Tên</th>
                                <th className={"w-[300px] border p-8 text-6xl"}>Mã vé</th>
                                <th className={"w-[300px] border p-8 text-6xl"}>Điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => {
                                let style = "";

                                switch (row.rank) {
                                    case 1:
                                        style = "bg-teal-300 text-black";
                                        break;
                                    case 2:
                                        style = "bg-amber-300/90 text-black";
                                        break;
                                    case 3:
                                        style = "bg-gray-300 text-black";
                                        break;
                                    default:
                                        style = "bg-amber-700/80";
                                        break;
                                }

                                return (
                                    <tr
                                        key={row.number}
                                        className={`${style}`}
                                    >
                                        <td className={"border border-white p-1 text-5xl font-bold"}>{row.rank}</td>
                                        <td className={"border border-white p-1 text-5xl"}>{row.name}</td>
                                        <td className={"border border-white p-1 text-5xl"}>{row.number}</td>
                                        <td className={"border border-white p-1 text-5xl font-bold"}>{row.score}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
