'use client'

import React, { useState } from "react";
import TableLaporan from "./table/TableLaporan";
import { TbCircleFilled } from "react-icons/tb";
import { useGet } from "@/app/hooks/useGet";
import { TimGetResponse } from "@/types/tim";

const LaporanKinerjaKonker = () => {

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
            <>
                {(data?.length === 0 || data === null) ?
                    <h1>Data Kosong / Belum Ditambahkan</h1>
                    :
                    data.map((item: TimGetResponse, index: number) => (
                        <React.Fragment key={index}>
                            <div className="flex items-start gap-1 mt-3 mb-1">
                                <TbCircleFilled className="mt-1 text-blue-500" />
                                <h1 className="font-bold text-xl">TIM : {item.nama_tim || "tanpa nama"}</h1>
                            </div>
                            <TableLaporan />
                        </React.Fragment>
                    ))
                }
            </>
        )
    }
}

export default LaporanKinerjaKonker;