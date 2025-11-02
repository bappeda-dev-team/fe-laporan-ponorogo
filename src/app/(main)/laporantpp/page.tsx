'use client'

import { useState } from "react";
import { Table } from "./comp/table";
import { useGet } from "@/app/hooks/useGet";
import { TimGetResponse } from "@/types/tim";

const LaporanTpp = () => {
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const { data, loading, error, message } = useGet<TimGetResponse[]>('/api/v1/timkerja/timkerja', FetchTrigger);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    } else if (error) {
        return (
            <h1>{message || "-"}</h1>
        )
    } else {
        return (
            <div className="flex flex-col gap-2">
                {data?.map((item: TimGetResponse, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                        <Table data={item}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default LaporanTpp;