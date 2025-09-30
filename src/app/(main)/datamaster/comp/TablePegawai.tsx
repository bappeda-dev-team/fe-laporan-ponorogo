'use client'

import TableComponent from "@/components/page/TableComponent";
import { useGet } from "@/app/hooks/useGet";
import { PegawaiGetResponse } from "@/types/tim";

const TablePegawai = () => {

    const kode_opd = process.env.NEXT_PUBLIC_KODE_OPD;
    const { data, loading, error, message } = useGet<PegawaiGetResponse[]>(`/api/v1/perencanaan/pegawai/findall?kode_opd=${kode_opd}`);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    } else if (error) {
        return (
            <h1>{message || "-"}</h1>
        )
    }

    return (
        <TableComponent className="border-yellow-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-yellow-500">
                        <th className="border-r border-b py-3 px-4 border-gray-300 w-[50px] text-center">No</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nama Pegawai</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[100px] text-center">NIP</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[100px] text-center">Nama Perangkat Daerah</th>
                    </tr>
                </thead>
                <tbody>
                    {data != null ?
                        data.map((item: PegawaiGetResponse, index: number) => (
                                <tr key={index}>
                                    <td className="border py-3 px-4 border-yellow-500 text-center">{index + 1}</td>
                                    <td className="border py-3 px-4 border-yellow-500">{item.nama_pegawai || "-"}</td>
                                    <td className="border py-3 px-4 border-yellow-500 text-center">{item.nip || "-"}</td>
                                    <td className="border py-3 px-4 border-yellow-500 text-center">{item.nama_opd || "-"}</td>
                                </tr>
                            ))
                        :
                        <tr>
                            <td colSpan={4} className="border border-yellow-500 px-6 py-4">Data Pegawai Kosong</td>
                        </tr>
                    }
                </tbody>
            </table>
        </TableComponent>
    )
}

export default TablePegawai;