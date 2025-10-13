'use client'

import TableComponent from "@/components/page/TableComponent";
import { ButtonSkyBorder, ButtonRedBorder } from "@/components/button/button";
import { TbCirclePlus, TbX, TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useGet } from "@/app/hooks/useGet";
import { TimGetResponse } from "@/types/tim";
import { RencanaKinerjaSekretariatResponse } from "@/types";
import { ModalRekin } from "./ModalRekin";
import { LoadingButtonClip2 } from "@/components/global/Loading";
import { AlertQuestion, AlertNotification } from "@/components/global/sweetalert2";
import useToast from "@/components/global/toast";
import { apiFetch } from "@/lib/apiFetch";

interface Table {
    data: TimGetResponse;
}

export const Table: React.FC<Table> = ({ data }) => {

    const [ModalRekinOpen, setModalRekinOpen] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const { toastSuccess } = useToast();

    const { data: DataTable, error: ErrorRekin, loading: LoadingRekin } = useGet<RencanaKinerjaSekretariatResponse[]>(`/api/v1/timkerja/timkerja_sekretariat/${data.kode_tim}/rencana_kinerja`, FetchTrigger)

    const hapusRekin = async (id: number) => {
        await apiFetch(`/api/v1/timkerja/timkerja_sekretariat/${data.kode_tim}/rencana_kinerja/${id}`, {
            method: "DELETE",
        }).then(resp => {
            toastSuccess("Rencana Kinerja dihapus");
            setFetchTrigger((prev) => !prev);
        }).catch(err => {
            AlertNotification("Gagal", `${err}`, "error", 3000, true);
        })
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex flex-col">
                    <h1 className="uppercase font-bold text-2xl">Susunan Tim: {data.nama_tim || "-"}</h1>
                    <h1 className="font-medium">{data.keterangan || ""}</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    <ButtonSkyBorder
                        className="flex items-center gap-1"
                        onClick={() => setModalRekinOpen(true)}
                    >
                        <TbCirclePlus />
                        Tambah Rencana Kinerja
                    </ButtonSkyBorder>
                </div>
            </div>
            <TableComponent className="border-emerald-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-emerald-500">
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rencana Kinerja</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Indikator Kinerja</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Target Tahun</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Sub Kegiatan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Pagu Anggaran</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Realisasi Anggaran</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rencana Aksi/Kegiatan yang Dilaksanakan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Faktor Pendorong</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Faktor Penghambat</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rekomendasi Tindak Lanjut</th>
                        </tr>
                        <tr className="text-white bg-emerald-600">
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">1</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">2</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">3</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">4</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">5</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">6</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">7</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">8</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">9 </th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">10</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center italic">11</th>
                        </tr>
                    </thead>
                    {LoadingRekin ?
                        <tbody>
                            <tr>
                                <td colSpan={30} className="flex gap-1 px-6 py-4 text-blue-500">
                                    <LoadingButtonClip2 />
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                        :
                        ErrorRekin ?
                            <tbody>
                                <tr>
                                    <td colSpan={30} className="flex gap-1 px-6 py-4 text-red-500">
                                        <TbX />
                                        Error saat mendapatkan data Rencana Kinerja di tim sekretariat, jika terus berlanjut hubungi tim developer
                                    </td>
                                </tr>
                            </tbody>
                            :
                            <tbody>
                                {DataTable?.length === 0 ?
                                    <tr>
                                        <td colSpan={30} className="px-6 py-4">Data Kosong, Tambahkan Rencana Kinerja</td>
                                    </tr>
                                    :
                                    DataTable?.map((item: RencanaKinerjaSekretariatResponse, index: number) => (
                                        <tr key={index}>
                                            <td className="border-b border-emerald-500 px-6 py-4 text-center">{index + 1}</td>
                                            <td className="border border-emerald-500 px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {item.rencana_kinerja || "-"}
                                                    <ButtonRedBorder
                                                        className="flex items-center gap-1"
                                                        onClick={() => {
                                                            AlertQuestion("Hapus Program", "data dari kolom 9 sampai 14 akan terhapus juga", "question", "Hapus", "Batal").then((result) => {
                                                                if (result.isConfirmed) {
                                                                    hapusRekin(item.id);
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <TbTrash />
                                                        Hapus
                                                    </ButtonRedBorder>
                                                </div>
                                            </td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                            <td className="border border-emerald-500 px-6 py-4">-</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                    }
                </table>
            </TableComponent>
            {ModalRekinOpen &&
                <ModalRekin
                    isOpen={ModalRekinOpen}
                    onClose={() => setModalRekinOpen(false)}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    kode_tim={data.kode_tim}
                />
            }
        </>
    )
}