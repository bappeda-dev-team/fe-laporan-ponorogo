'use client'

import TableComponent from "@/components/page/TableComponent";
import { ButtonRedBorder, ButtonSkyBorder, ButtonGreenBorder } from "@/components/button/button";
import { TbPencil, TbTrash, TbUpload, TbCircleFilled, TbCirclePlus } from "react-icons/tb";
import { AlertNotification, AlertQuestion } from "@/components/global/sweetalert2";
import { formatRupiah } from "@/app/hooks/formatRupiah";
import useToast from "@/components/global/toast";
import { TimGetResponse } from "@/types/tim";
import { useState } from "react";
import { ModalProgramUnggulan } from "./ModalProgramUnggulan";
import { useGet } from "@/app/hooks/useGet";
import { KinerjaKonkerGetResponse } from "@/types";
import { LoadingButtonClip2 } from "@/components/global/Loading";
import { Realisasi } from "./Realisasi";
import { ModalUpload } from "./ModalUpload";
import { apiFetch } from "@/lib/apiFetch";

interface Table {
    data: TimGetResponse;
}

const Table: React.FC<Table> = ({ data }) => {

    const [ModalProgram, setModalProgram] = useState<boolean>(false);
    const [ModalRealisasi, setModalRealisasi] = useState<boolean>(false);
    const [ModalBuktiOpen, setModalBuktiOpen] = useState<boolean>(false);
    const [DataTim, setDataTim] = useState<TimGetResponse | null>(null);

    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const { toastSuccess } = useToast();

    const { data: DataTable, error: ErrorProgram, loading: LoadingProgram } = useGet<KinerjaKonkerGetResponse[]>(`/api/v1/timkerja/timkerja/${data.kode_tim}/program_unggulan`, FetchTrigger)

    const handleModalProgram = (data: TimGetResponse | null) => {
        if (ModalProgram) {
            setModalProgram(false);
            setDataTim(null);
        } else {
            setModalProgram(true);
            setDataTim(data);
        }
    }

    const hapusProgram = async (id: number) => {
        await apiFetch(`/api/v1/timkerja/timkerja/${data.kode_tim}/program_unggulan/${id}`, {
            method: "DELETE",
        }).then(resp => {
            // toastSuccess("tim berhasil dihapus");
            AlertNotification("Berhasil", "Tim Berhasil Dihapus", "success", 3000, true);
            setFetchTrigger((prev) => !prev);
        }).catch(err => {
            AlertNotification("Gagal", `${err}`, "error", 3000, true);
        })
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-start gap-1 mb-1">
                    <TbCircleFilled className="mt-2 text-blue-500" />
                    <div className="flex flex-col">
                        <h1 className="uppercase font-bold text-2xl">Susunan Tim: {data.nama_tim || "-"}</h1>
                        <h1 className="font-medium">{data.keterangan || "-"}</h1>
                    </div>
                </div>
                <ButtonGreenBorder
                    className="flex items-center gap-1"
                    onClick={() => handleModalProgram(data)}
                >
                    <TbCirclePlus />
                    Tambah Program Unggulan
                </ButtonGreenBorder>
            </div>
            <TableComponent className="border-blue-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-blue-500">
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nama Program Unggulan</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Pohon Kinerja</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Indikator Kinerja</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[150px] text-center">Target Tahun</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Perangkat Daerah</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Sub Kegiatan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Pagu Anggaran</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Realisasi Anggaran</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rencana Aksi</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Faktor Pendorong</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Faktor Penghambat</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rekomendasi Tindak Lanjut</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Bukti Pendukung</th>
                        </tr>
                        <tr className="text-white bg-blue-600">
                            <th className="border-r border-b py-1 border-gray-300 text-center">1</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">2</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">3</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">4</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">5</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">6</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">7</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">8</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">9 </th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">10</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">11</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">12</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">13</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">14</th>
                        </tr>
                    </thead>
                    {LoadingProgram ?
                        <tbody>
                            <tr>
                                <td colSpan={30} className="flex gap-1 px-6 py-4 text-blue-500">
                                    <LoadingButtonClip2 />
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                        :
                        ErrorProgram ?
                            <tbody>
                                <tr>
                                    <td colSpan={30} className="flex gap-1 px-6 py-4 text-blue-500">
                                        <LoadingButtonClip2 />
                                        Error saat mendapatkan data program unggulan, jika terus berlanjut hubungi tim developer
                                    </td>
                                </tr>
                            </tbody>
                            :
                            <tbody>
                                {DataTable?.length === 0 ?
                                    <tr>
                                        <td colSpan={30} className="px-6 py-4">Data Kosong, Tambahkan Program Unggulan</td>
                                    </tr>
                                    :
                                    DataTable?.map((item: KinerjaKonkerGetResponse, index: number) => (
                                        <tr key={index}>
                                            <td className="border-b border-blue-500 px-6 py-4 text-center">{index + 1}</td>
                                            <td className="border border-blue-500 px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {item.program_unggulan || "-"}
                                                    <ButtonRedBorder
                                                        className="flex items-center gap-1"
                                                        onClick={() => {
                                                            AlertQuestion("Hapus Program", "data dari kolom 9 sampai 14 akan terhapus juga", "question", "Hapus", "Batal").then((result) => {
                                                                if (result.isConfirmed) {
                                                                    hapusProgram(item.id);
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <TbTrash />
                                                        Hapus
                                                    </ButtonRedBorder>
                                                </div>
                                            </td>
                                            <td className="border border-blue-500 px-6 py-4">Pelaksanaan Program didalam lingkup Bappeda</td>
                                            <td className="border border-blue-500 px-6 py-4">indikator program 1 T</td>
                                            <td className="border border-blue-500 px-6 py-4">30</td>
                                            <td className="border border-blue-500 px-6 py-4">Badan Perencanaan Penelitian dan Pengembangan Daerah</td>
                                            <td className="border border-blue-500 px-6 py-4">(5.01.02.2.01) Penyusunan dan Perancangan</td>
                                            <td className="border border-blue-500 px-6 py-4">Rp.{formatRupiah(2000000)}</td>
                                            <td className="border border-blue-500 px-6 py-4">
                                                <Realisasi anggaran={5000000} />
                                            </td>
                                            <td className="border border-blue-500 px-6 py-4">contoh rencana aksi</td>
                                            <td className="border border-blue-500 px-6 py-4">contoh faktor pendorong</td>
                                            <td className="border border-blue-500 px-6 py-4">contoh faktor penghambat</td>
                                            <td className="border border-blue-500 px-6 py-4">rekomendasi tindak lanjut</td>
                                            <td className="border-b border-blue-500 px-6 py-4">
                                                <div className="flex justify-center">
                                                    <ButtonSkyBorder
                                                        className="flex items-center gap-2"
                                                        onClick={() => setModalBuktiOpen(true)}
                                                    >
                                                        <TbUpload />
                                                        Upload
                                                    </ButtonSkyBorder>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                    }
                </table>
            </TableComponent>
            {ModalProgram &&
                <ModalProgramUnggulan
                    isOpen={ModalProgram}
                    onClose={() => handleModalProgram(null)}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    Data={DataTim}
                />
            }
            {ModalBuktiOpen &&
                <ModalUpload
                    isOpen={ModalBuktiOpen}
                    onClose={() => setModalBuktiOpen(false)}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                />
            }
        </>
    )
}

export default Table;