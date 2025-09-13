import TableComponent from "@/components/page/TableComponent";
import { TbCircleCheck } from "react-icons/tb";

const Table = () => {
    return (
        <>
            <TableComponent className="border-blue-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-blue-500">
                            <th rowSpan={2} className="border-r border-b py-3 px-4 border-gray-300 min-w-[50px] text-center">No</th>
                            <th rowSpan={2} className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Tahapan Kerja</th>
                            <th colSpan={2} className="border-r border-b py-2 px-3 border-gray-300 min-w-[100px] text-center">bulan 1</th>
                            <th colSpan={3} className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">bulan 2</th>
                            <th rowSpan={2} className="border-r border-b py-3 px-4 border-gray-300 min-w-[150px] text-center">keterangan</th>
                            <th rowSpan={2} className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">pelaksana</th>
                            <th rowSpan={2} className="border-r border-b py-3 px-4 border-gray-300 min-w-[300px] text-center">jenis kegiatan</th>
                        </tr>
                        <tr className="bg-blue-600 text-white">
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[50px] text-center">III</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[50px] text-center">III</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[50px] text-center">III</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[50px] text-center">III</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[50px] text-center">III</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-blue-500 px-6 py-4 text-center">1</td>
                            <td className="border border-blue-500 px-6 py-4">Pengumpulan data serta penjelasan konsep dan jadwal kerja</td>
                            <td className="border border-blue-500 px-6 py-4 bg-orange-400 text-green-300"><TbCircleCheck /></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4">DATA MASTER: DATA OPD, DATA MASTER PEGAWAI, POKIN PEMDA, POKIN OPD, DRAFT AKHIR RPJMD</td>
                            <td className="border border-blue-500 px-6 py-4">Bappeda</td>
                            <td className="border border-blue-500 px-6 py-4">Offline 1</td>
                        </tr>
                        <tr>
                            <td className="border-b border-blue-500 px-6 py-4 text-center">2</td>
                            <td className="border border-blue-500 px-6 py-4">INPUT DATA POKIN PEMDA MAUPUN OPD BESERTA PROGRAM UNGGULAN BUPATI</td>
                            <td className="border border-blue-500 px-6 py-4 bg-orange-400 text-green-300"><TbCircleCheck /></td>
                            <td className="border border-blue-500 px-6 py-4 bg-orange-400 text-green-300"><TbCircleCheck /></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">Bappeda dan bagian organisasi dan tim</td>
                            <td className="border border-blue-500 px-6 py-4">Offline 2</td>
                        </tr>
                        <tr>
                            <td className="border-b border-blue-500 px-6 py-4 text-center">3</td>
                            <td className="border border-blue-500 px-6 py-4">ANALISIS DATA</td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4 bg-orange-400 text-green-300"><TbCircleCheck /></td>
                            <td className="border border-blue-500 px-6 py-4 bg-orange-400 text-green-300"><TbCircleCheck /></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4"></td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">tim pendamping</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                        </tr>
                    </tbody>
                </table>
            </TableComponent>
        </>
    )
}

export default Table;