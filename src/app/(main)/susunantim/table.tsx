'use client'

import { useState, useEffect } from "react";
import { TableAnggota } from "./comp/TableAnggota";
import { ButtonSky } from "@/components/button/button";
import { TbUsersGroup } from "react-icons/tb";
import { TimGetResponse } from "@/types/tim";
import { useGet } from "@/app/hooks/useGet";
import { apiFetch } from "@/lib/apiFetch";
import { ModalTim } from "./comp/ModalTim";
import { ApiResp, TimKerja } from "@/types";

export const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    
    const [timKerja, setTimKerja] = useState<TimKerja[]>([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)

    // useEffect(() => {
    //     apiFetch<ApiResp<TimKerja>>("/api/v1/timkerja/timkerja")
    //         .then(resp => {
    //             setTimKerja(resp.data)
    //             setError(null)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             setError("terjadi kesalahan")
    //         })
    //         .finally(() => {
    //             setLoading(false)
    //         })
    // }, [FetchTrigger])

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
                <div className="flex flex-col gap-2">
                    <ButtonSky className="flex items-center gap-1" onClick={() => setModalOpen(true)}>
                        <TbUsersGroup />
                        Tambah Tim
                    </ButtonSky>
                    {data?.map((item: TimGetResponse, index: number) => (
                        <div key={index} className="flex flex-col gap-2">
                            <TableAnggota data={item} onSuccess={() => setFetchTrigger((prev) => !prev)}/>
                        </div>
                    ))}
                </div>
                <ModalTim
                    isOpen={ModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    jenis="baru"
                />
            </>
        )
    }

}