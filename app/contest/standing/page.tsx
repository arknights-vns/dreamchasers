"use client";

import type { ContestantInfo } from "@/lib/vns";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        <div className={"flex h-visible flex-col"}>
            {/* <PageTitle favorText={"Khoan, chúng ta có podium cho tournament à?"} light title={"STANDING"} /> */}

            <div className={`
                mx-16 flex flex-1/2 flex-col items-center justify-center
            `}
            >
                {loading && <div>Loading...</div>}
                {!loading && error && <div>{error}</div>}
                {!loading && !error && (
                    <Table className={"w-full"}>
                        <TableHeader>
                            <TableRow className={"bg-muted"}>
                                <TableHead className={`
                                    w-[40px] border border-primary py-4
                                    text-center text-4xl font-extrabold
                                `}
                                >
                                    #
                                </TableHead>
                                <TableHead className={`
                                    w-[200px] border border-primary py-4
                                    text-center text-4xl font-extrabold
                                `}
                                >
                                    Tên
                                </TableHead>
                                <TableHead
                                    className={`
                                        w-[100px] border border-primary py-4
                                        text-center text-4xl font-extrabold
                                    `}
                                    id={"tu-tu-tu-du-max-verstappen"}
                                >
                                    Mã vé
                                </TableHead>
                                <TableHead className={`
                                    w-[150px] border border-primary py-4
                                    text-center text-4xl font-extrabold
                                `}
                                >
                                    Điểm
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row) => {
                                let style = "";

                                switch (row.rank) {
                                    case 1:
                                        style = "bg-amber-300/90 text-black";
                                        break;
                                    case 2:
                                        style = "bg-gray-300/80 text-black";
                                        break;
                                    case 3:
                                        style = "bg-amber-700/80 text-white";
                                        break;
                                }

                                return (
                                    <TableRow
                                        key={row.number}
                                        className={clsx(style)}
                                    >
                                        <TableCell className={`
                                            border border-primary p-1
                                            text-center text-3xl font-bold
                                        `}
                                        >
                                            {row.rank}
                                        </TableCell>
                                        <TableCell className={`
                                            border border-primary p-1
                                            text-center text-3xl
                                        `}
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell className={`
                                            border border-primary p-1
                                            text-center text-3xl
                                        `}
                                        >
                                            {row.number}
                                        </TableCell>
                                        <TableCell className={`
                                            border border-primary p-1
                                            text-center text-3xl font-bold
                                        `}
                                        >
                                            {row.score}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
