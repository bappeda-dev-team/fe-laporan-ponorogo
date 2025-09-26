'use client'

import { useState } from "react";
import { TableAnggota } from "./comp/TableAnggota";
import { ButtonSkyBorder } from "@/components/button/button";
import { TbCirclePlus } from "react-icons/tb";
import { TimGetResponse } from "@/types/tim";
import { useGet } from "@/app/hooks/useGet";
import { ModalTim } from "./comp/ModalTim";

export const Table = () => {

    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    
    const { data, loading, error, message } = useGet<TimGetResponse[]>('timkerja', FetchTrigger);

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
                {data?.map((item: TimGetResponse, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                        <ButtonSkyBorder 
                            className="flex items-center gap-1"
                            onClick={() => setModalOpen(true)}
                        >
                            <TbCirclePlus />
                            Tambah Tim
                        </ButtonSkyBorder>
                        <TableAnggota data={item} />
                    </div>
                ))}
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