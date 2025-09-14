import TableComponent from "@/components/page/TableComponent";
import { ButtonGreenBorder } from "@/components/button/button";
import { TbCirclePlus } from "react-icons/tb";

const TableAnggota = () => {
    return (
        <div className="flex flex-col p-2 border border-emerald-500 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <h1 className="uppercase font-bold text-2xl">Susunan Tim Monev 1</h1>
                <ButtonGreenBorder className="flex items-center gap-1">
                    <TbCirclePlus />
                    Tambah Anggota
                </ButtonGreenBorder>
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
                        </tr>
                        <tr className="text-white bg-emerald-600">
                            <th className="border-r border-b py-1 border-gray-300 text-center">1</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">2</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">3</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">4</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-emerald-500 px-6 py-4 text-center">1</td>
                            <td className="border border-emerald-500 px-6 py-4">Ryan Brilian</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">1023081723071</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">Ketua</td>
                            <td className="border border-emerald-500 px-6 py-4">-</td>
                        </tr>
                        <tr>
                            <td className="border-b border-emerald-500 px-6 py-4 text-center">2</td>
                            <td className="border border-emerald-500 px-6 py-4">Ilham Akbar</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">0192730172093</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">Wakil Ketua</td>
                            <td className="border border-emerald-500 px-6 py-4">-</td>
                        </tr>
                        <tr>
                            <td className="border-b border-emerald-500 px-6 py-4 text-center">3</td>
                            <td className="border border-emerald-500 px-6 py-4">Agnar Brian</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">1241325423513</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">Anggota</td>
                            <td className="border border-emerald-500 px-6 py-4">-</td>
                        </tr>
                        <tr>
                            <td className="border-b border-emerald-500 px-6 py-4 text-center">4</td>
                            <td className="border border-emerald-500 px-6 py-4">Myko Akbar</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">1241234134645</td>
                            <td className="border border-emerald-500 px-6 py-4 text-center">Anggota</td>
                            <td className="border border-emerald-500 px-6 py-4">-</td>
                        </tr>
                    </tbody>
                </table>
            </TableComponent>
        </div>
    )
}

export default TableAnggota;