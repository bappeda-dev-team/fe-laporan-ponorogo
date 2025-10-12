'use client'

import { Table } from "./Table";
import { useGet } from "@/app/hooks/useGet";
import { TimGetResponse } from "@/types/tim";

const LaporanKinerjaSekretariat = () => {

    const { data, loading, error, message } = useGet<TimGetResponse[]>('/api/v1/timkerja/timkerja-sekretariat');

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
                    <h1>Tidak ada Tim yang dibentuk / Belum Ditambahkan</h1>
                    :
                    data.map((item: TimGetResponse, index: number) => (
                        <div key={index} className="flex flex-col p-2 mb-2 border-2 border-emerald-500 rounded-lg">
                            <Table data={item} />
                        </div>
                    ))
                }
            </>
        )
    }
}

export default LaporanKinerjaSekretariat;