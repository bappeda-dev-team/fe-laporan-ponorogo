'use client'

import TableComponent from "@/components/page/TableComponent";
import { ButtonRedBorder, ButtonSkyBorder, ButtonGreenBorder } from "@/components/button/button";
import { TbX, TbTrash, TbUpload, TbCircleFilled, TbCirclePlus, TbPencil } from "react-icons/tb";
import { AlertNotification, AlertQuestion } from "@/components/global/sweetalert2";
import { formatRupiah } from "@/app/hooks/formatRupiah";
import useToast from "@/components/global/toast";
import { TimGetResponse } from "@/types/tim";
import React, { useState } from "react";
import { ModalProgramUnggulan } from "./ModalProgramUnggulan";
import { useGet } from "@/app/hooks/useGet";
import { IndikatorRencanaKinerja, KinerjaKonkerGetResponse, PohonKinerjaKonker, Target } from "@/types";
import { LoadingButtonClip2 } from "@/components/global/Loading";
import { Realisasi } from "./Realisasi";
import { RencanaAksi } from "./RencanaAksi";
import { Rekomendasi } from "./Rekomendasi";
import { Faktor } from "./Faktor";
import { ModalUpload } from "./ModalUpload";
import { ModalPelaksana } from "./ModalPelaksana";
import { apiFetch } from "@/lib/apiFetch";

interface Table {
    data: TimGetResponse;
}

const Table: React.FC<Table> = ({ data }) => {

    const [ModalProgram, setModalProgram] = useState<boolean>(false);
    const [ModalBuktiOpen, setModalBuktiOpen] = useState<boolean>(false);
    const [ModalPelaksanaOpen, setModalPelaksanaOpen] = useState<boolean>(false);
    const [DataTim, setDataTim] = useState<TimGetResponse | null>(null);
    const [DataPohon, setDataPohon] = useState<PohonKinerjaKonker | null>(null);

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
    const handleModalPelaksana = (data: PohonKinerjaKonker | null) => {
        if (ModalPelaksanaOpen) {
            setModalPelaksanaOpen(false);
            setDataPohon(null);
        } else {
            setModalPelaksanaOpen(true);
            setDataPohon(data);
        }
    }

    const hapusProgram = async (id: number) => {
        await apiFetch(`/api/v1/timkerja/timkerja/${data.kode_tim}/program_unggulan/${id}`, {
            method: "DELETE",
        }).then(resp => {
            toastSuccess("Program dihapus");
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
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[300px] text-center">Nama Program Unggulan</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[300px] text-center">Pohon Kinerja</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[300px] text-center">Indikator Kinerja</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Target Tahun</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Perangkat Daerah</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Pelaksana</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[300px] text-center">Petugas Tim</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rencana Kinerja</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Sub Kegiatan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Pagu Anggaran</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Realisasi Anggaran</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rencana Aksi</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[250px] text-center">Faktor Pendorong</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[250px] text-center">Faktor Penghambat</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[250px] text-center">Risiko Hukum</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[250px] text-center">Rekomendasi Tindak Lanjut</th>
                            <th className="border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Bukti Pendukung</th>
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
                            <th className="border-r border-b py-1 border-gray-300 text-center">15</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">16</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">17</th>
                            <th className="border-b py-1 border-gray-300 text-center">18</th>
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
                                    <td colSpan={30} className="flex gap-1 px-6 py-4 text-red-500">
                                        <TbX />
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
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td rowSpan={item.pohon_kinerja?.length > 0 ? item.pohon_kinerja.length + 1 : 2} className="border-b border-blue-500 px-6 py-4 text-center">{index + 1}</td>
                                                <td rowSpan={item.pohon_kinerja?.length > 0 ? item.pohon_kinerja.length + 1 : 2} className="border border-blue-500 px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <p className="border-b py-1 mb-1 border-blue-500">{item.program_unggulan || "-"}</p>
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
                                            </tr>
                                            {item.pohon_kinerja.length > 0 ?
                                                item.pohon_kinerja.map((p: PohonKinerjaKonker, p_index: number) => (
                                                    <tr key={p_index}>
                                                        <td className="border border-blue-500 px-6 py-4">
                                                            <p key={p_index}>{p.nama_pohon || "-"}</p>
                                                        </td>
                                                        {p.indikator ?
                                                            <>
                                                                {/* INDIKATOR */}
                                                                <td className="border border-blue-500 px-6 py-4">
                                                                    <div className="flex flex-col gap-1">
                                                                        {p.indikator.map((i: IndikatorRencanaKinerja, i_index: number) => (
                                                                            <p className="p-1" key={i_index}>
                                                                                {i_index + 1}. {i.nama_indikator || "-"}
                                                                            </p>
                                                                        ))}
                                                                    </div>
                                                                </td>
                                                                {/* TARGET SATUAN */}
                                                                <td className="border border-blue-500 px-6 py-4">
                                                                    <div className="flex flex-col gap-1">
                                                                        {p.indikator.map((i: IndikatorRencanaKinerja, i_index: number) => (
                                                                            i.targets.map((t: Target, t_index: number) => (
                                                                                <p className="p-1" key={t_index}>
                                                                                    {i_index + 1}. {t.target || "-"} / {t.satuan || "-"}
                                                                                </p>
                                                                            ))
                                                                        ))}
                                                                    </div>
                                                                </td>
                                                            </>
                                                            :
                                                            <>
                                                                <td className="border border-blue-500 px-6 py-4">-</td>
                                                                <td className="border border-blue-500 px-6 py-4">-</td>
                                                            </>
                                                        }
                                                        <td className="border border-blue-500 px-6 py-4">{p.nama_opd || "-"}</td>
                                                        <td className="border border-blue-500 px-6 py-4">-</td>
                                                        <td className="border border-blue-500 px-6 py-4">
                                                            {/* PELAKSANA */}
                                                            <div className="flex flex-col justify-center gap-2">
                                                                <p className="border-b border-blue-300 italic text-red-400 text-sm">Petugas dalam pengembangan</p>
                                                                <ButtonSkyBorder
                                                                    className="flex items-center gap-2"
                                                                    onClick={() => handleModalPelaksana(p)}
                                                                >
                                                                    <TbPencil />
                                                                    Petugas Tim
                                                                </ButtonSkyBorder>
                                                            </div>
                                                        </td>
                                                        <td className="border border-blue-500 px-6 py-4">-</td>
                                                        <td className="border border-blue-500 px-6 py-4">-</td>
                                                        <td className="border border-blue-500 px-6 py-4">Rp.{formatRupiah(0)}</td>
                                                        <td className="border border-blue-500 px-6 py-4"><Realisasi anggaran={0} /></td>
                                                        <td className="border border-blue-500 px-6 py-4"><RencanaAksi renaksi="" /></td>
                                                        <td className="border border-blue-500 px-6 py-4"><Faktor faktor="" jenis="pendorong" /></td>
                                                        <td className="border border-blue-500 px-6 py-4"><Faktor faktor="" jenis="penghambat" /></td>
                                                        <td className="border border-blue-500 px-6 py-4"><Faktor faktor="" jenis="penghambat" /></td>
                                                        <td className="border border-blue-500 px-6 py-4"><Rekomendasi rekomendasi="" /></td>
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
                                                :
                                                <tr>
                                                    {Array.from({ length: 15 }, (_, index) => (
                                                        <td key={index}
                                                            className={`border ${index === 11 ? 'border-b' : 'border'} border-blue-500 px-6 py-4`}
                                                        >
                                                            -
                                                        </td>
                                                    ))}
                                                </tr>
                                            }
                                        </React.Fragment>
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
            {ModalPelaksanaOpen &&
                <ModalPelaksana
                    isOpen={ModalPelaksanaOpen}
                    onClose={() => handleModalPelaksana(null)}
                    onSuccess={() => setFetchTrigger((prev) => !prev)}
                    kode_tim={data.kode_tim}
                    Data={DataPohon}
                />
            }
        </>
    )
}

export default Table;