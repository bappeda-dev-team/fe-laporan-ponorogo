"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/apiFetch"
import { ApiResp, TimKerja } from "@/types"
import TableAnggota from "./TableAnggota";
import { ButtonSkyBorder } from "@/components/button/button";
import { TbCirclePlus } from "react-icons/tb";

const SusunanTim = () => {
    const [timKerja, setTimKerja] = useState<TimKerja[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        apiFetch<ApiResp<TimKerja>>("/api/v1/timkerja/timkerja")
            .then(resp => {
                setTimKerja(resp.data)
                setError(null)
            })
            .catch(err => {
                console.error(err)
                setError("terjadi kesalahan")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (timKerja.length === 0) return <p>Tim Kerja belum dibuat</p>

    return (
        <>
            <div className="flex flex-col gap-2">
                <ButtonSkyBorder className="flex items-center gap-1">
                    <TbCirclePlus />
                    Tambah Tim
                </ButtonSkyBorder>
                <TableAnggota timKerja={timKerja} />
            </div>
        </>
    )
}

export default SusunanTim;
