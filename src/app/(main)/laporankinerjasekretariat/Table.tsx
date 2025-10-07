'use client'

import TableComponent from "@/components/page/TableComponent";
import { ButtonSkyBorder } from "@/components/button/button";
import { TbCirclePlus } from "react-icons/tb";
import { useState } from "react";

export const Table = () => {
    
    return (
        <div className="flex flex-col p-2 border-2 border-emerald-500 rounded-lg">
            <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex flex-col">
                    <h1 className="uppercase font-bold text-2xl">Susunan Tim: </h1>
                    <h1 className="font-medium">-</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    <ButtonSkyBorder
                        className="flex items-center gap-1"
                        // onClick={() => handleModalTim(data)}
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
                    <tbody>
                        <tr>
                            <td className="border-b border-emerald-500 px-6 py-4 text-center">1</td>
                            <td className="border border-emerald-500 px-6 py-4">-</td>
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
                    </tbody>
                </table>
            </TableComponent>
        </div>
    )
}