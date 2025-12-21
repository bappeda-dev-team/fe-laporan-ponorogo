'use client'

import { useState } from "react";
import Table from "./comp/table";
import { useGet } from "@/app/hooks/useGet";
import { TimGetResponse } from "@/types/tim";
import { useBrandingContext } from "@/provider/BrandingProvider";

const PenilaianKinerjaTim = () => {
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const {branding} = useBrandingContext();
    const queryParams = `tahun=${branding?.tahun?.value}&bulan=${branding?.bulan?.value}`
    const { data, loading, error, message } = useGet<TimGetResponse[]>(`/api/v1/timkerja/penilaian_kinerja?${queryParams}`, FetchTrigger);

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
                {data && data?.length > 0 ? 
                    data?.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Table data={item} />
                        </div>
                    ))
                :
                    <p>Data Tim {branding?.bulan?.label || ""} {branding?.tahun?.label || ""} kosong</p>
                }
            </div>
        )
    }
}

export default PenilaianKinerjaTim;
