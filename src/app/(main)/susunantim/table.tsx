'use client'

import { useState } from "react";
import { TableAnggota } from "./comp/TableAnggota";
import { ButtonSky } from "@/components/button/button";
import { TbUsersGroup } from "react-icons/tb";
import { TimGetResponse } from "@/types/tim";
import { useGet } from "@/app/hooks/useGet";
import { ModalTim } from "./comp/ModalTim";

export const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const { data, loading, error, message } = useGet<TimGetResponse[]>('api/v1/timkerja/timkerja', FetchTrigger);

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
                            <TableAnggota data={item} />
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