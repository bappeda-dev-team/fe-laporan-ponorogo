'use client'

import { useState } from "react";
import { Table } from "./comp/table";
import { useGet } from "@/app/hooks/useGet";
import { PenilaianTimResponse } from "@/types/penilaian_tpp";
import { useBrandingContext } from "@/provider/BrandingProvider";

const LaporanTpp = () => {
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const {branding} = useBrandingContext();
    const { data, loading, error, message } = useGet<PenilaianTimResponse[]>(`/api/v1/timkerja/laporan_tpp?tahun=${branding?.tahun?.value}&bulan=${branding?.bulan?.value}`, FetchTrigger);

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
                {data?.map((item: PenilaianTimResponse, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                        <Table data={item}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default LaporanTpp;
