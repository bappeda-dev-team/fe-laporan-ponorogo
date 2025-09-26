import TableComponent from "@/components/page/TableComponent";
import { ButtonGreenBorder } from "@/components/button/button";
import { TbCirclePlus } from "react-icons/tb";
import { AnggotaGetResponse, TimGetResponse } from "@/types/tim";
import { ButtonSkyBorder, ButtonRedBorder } from "@/components/button/button";
import { TbPencil, TbTrash } from "react-icons/tb";

interface Table {
    data: TimGetResponse;
}

export const TableAnggota: React.FC<Table> = ({ data }) => {
    return (
        <div className="flex flex-col p-2 border border-emerald-500 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <h1 className="uppercase font-bold text-2xl">Susunan : {data.nama_tim || "tanpa nama"}</h1>
                <ButtonGreenBorder className="flex items-center gap-1">
                    <TbCirclePlus />
                    Tambah Anggota
                </ButtonGreenBorder>
            </div>
            <Anggota anggota={data.susunan_tims} />
        </div>
    )
}

interface TableAnggota {
    anggota: AnggotaGetResponse[]
}
export const Anggota: React.FC<TableAnggota> = ({ anggota }) => {
    return (
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
                    {anggota.length ?
                        anggota.map((item: AnggotaGetResponse, index: number) => (
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
                                            // onClick={() => setModalAtasanOpen(true)}
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
    )
}