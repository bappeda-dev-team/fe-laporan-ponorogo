'use client'

import { useState } from "react";
import TableComponent from "@/components/page/TableComponent";
import { AnggotaGetResponse, TimGetResponse } from "@/types/tim";
import { ButtonSkyBorder, ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { TbPencil, TbTrash, TbCirclePlus } from "react-icons/tb";
import { ModalAnggota } from "./ModalAnggota";
import { ModalTim } from "./ModalTim";
import { AlertQuestion } from "@/components/global/sweetalert2";

interface Table {
    data: TimGetResponse;
    onSuccess: () => void;
}

export const TableAnggota: React.FC<Table> = ({ data, onSuccess }) => {

    const [ModalAnggotaOpen, setModalAnggotaOpen] = useState<boolean>(false);
    const [ModalTimOpen, setModalTimOpen] = useState<boolean>(false);
    const [DataModalAnggota, setDataModalAnggota] = useState<any>(null);
    const [DataModalTim, setDataModalTim] = useState<any>(null);
    const [JenisModal, setJenisModal] = useState<"baru" | "edit" | "">("");

    const handleModalAnggota = (jenis: "baru" | "edit" | "", data?: any) => {
        if (ModalAnggotaOpen) {
            setModalAnggotaOpen(false);
            setDataModalAnggota(null);
            setJenisModal("");
        } else {
            setModalAnggotaOpen(true);
            setDataModalAnggota(data);
            setJenisModal(jenis);
        }
    }
    const handleModalTim = (data?: any) => {
        if (ModalTimOpen) {
            setModalTimOpen(false);
            setDataModalTim(null);
        } else {
            setModalTimOpen(true);
            setDataModalTim(data);
        }
    }

    return (
        <div className="flex flex-col p-2 border border-emerald-500 rounded-lg">
            <div className="flex flex-wrap items-center justify-between mb-2">
                <h1 className="uppercase font-bold text-2xl">Susunan : {data.nama_tim || "tanpa nama"}</h1>
                <div className="flex flex-wrap gap-2">
                    <ButtonGreenBorder
                        className="flex items-center gap-1"
                        onClick={() => handleModalAnggota('baru', null)}
                    >
                        <TbCirclePlus />
                        Tambah Anggota
                    </ButtonGreenBorder>
                    <ButtonSkyBorder
                        className="flex items-center gap-1"
                        onClick={() => handleModalTim(data)}
                    >
                        <TbPencil />
                        Edit Tim
                    </ButtonSkyBorder>
                    <ButtonRedBorder
                        className="flex items-center gap-1"
                        onClick={() => AlertQuestion("Hapus Tim", "Tim akan terhapus bersama dengan anggota tim yang sudah terisi", "warning", "Hapus", "Batal").then((result) => {
                            if(result.isConfirmed){

                            }
                        })}
                    >
                        <TbTrash />
                        Hapus Tim
                    </ButtonRedBorder>
                </div>
            </div>
            <TableComponent className="border-emerald-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-emerald-500">
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nama</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">NIP</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Jabatan Dalam Tim</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Keterangan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[100px] text-center">Aksi</th>
                        </tr>
                        <tr className="text-white bg-emerald-600">
                            <th className="border-r border-b py-1 border-gray-300 text-center">1</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">2</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">3</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">4</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">5</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">6</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.susunan_tims.length ?
                            data.susunan_tims
                                .slice()
                                .sort((a, b) => a.level_jabatan - b.level_jabatan)
                                .map((item: AnggotaGetResponse, index: number) => (
                                    <tr key={index}>
                                        <td className="border-b border-emerald-500 px-6 py-4 text-center">{index + 1}</td>
                                        <td className="border border-emerald-500 px-6 py-4">nama</td>
                                        <td className="border border-emerald-500 px-6 py-4 text-center">{item.nip || "-"}</td>
                                        <td className="border border-emerald-500 px-6 py-4 text-center">{item.nama_jabatan || "-"}</td>
                                        <td className="border border-emerald-500 px-6 py-4">{item.keterangan || "-"}</td>
                                        <td className="border border-emerald-500 px-6 py-4">
                                            <div className="flex flex-col gap-2 justify-center items-center">
                                                <ButtonSkyBorder
                                                    className="flex items-center gap-1 w-full"
                                                    onClick={() => handleModalAnggota('edit', item)}
                                                >
                                                    <TbPencil />
                                                    Edit
                                                </ButtonSkyBorder>
                                                <ButtonRedBorder
                                                    className="flex items-center gap-1 w-full"
                                                >
                                                    <TbTrash />
                                                    Hapus
                                                </ButtonRedBorder>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            :
                            <tr>
                                <td colSpan={6} className="border border-emerald-500 px-6 py-4">Data Anggota Kosong</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </TableComponent>
            {ModalAnggotaOpen &&
                <ModalAnggota
                    isOpen={ModalAnggotaOpen}
                    onClose={() => handleModalAnggota("", null)}
                    jenis={JenisModal}
                    kode_tim={data.kode_tim}
                    onSuccess={onSuccess}
                    data={DataModalAnggota}
                />
            }
            {ModalTimOpen && 
                <ModalTim 
                    isOpen={ModalTimOpen}
                    data={DataModalTim}
                    onClose={() => handleModalTim(null)}
                    onSuccess={onSuccess}
                    jenis="edit"
                />
            }
        </div>
    )
}