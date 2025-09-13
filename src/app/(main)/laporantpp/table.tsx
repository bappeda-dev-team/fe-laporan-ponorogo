import TableComponent from "@/components/page/TableComponent";
import { TbCircleCheck } from "react-icons/tb";

const Table = () => {
    return (
        <>
            <TableComponent className="border-blue-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-blue-500">
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[50px] text-center">No</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nama/NIP</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Pangkat/Golongan/Jabatan</th>
                            <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Jabatan dalam tim</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[150px] text-center">Basic TPP kondisi kerja</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Kinerja Bappeda</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Kerja Tim</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Kerja Perso</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Akhir</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Persentase penerimaan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Jumlah Kotor</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Pajak</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Jumlah Pajak</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">POT BPJS (1%)</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Jumlah Bersih</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[300px] text-center">Tanda Tangan</th>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-blue-500 px-6 py-4 text-center">1</td>
                            <td className="border border-blue-500 px-6 py-4">
                                <div className="flex flex-col">
                                    <p className="border-b">Budi</p>
                                    <p>10928309182309182</p>
                                </div>
                            </td>
                            <td className="border border-blue-500 px-6 py-4">
                                <div className="flex flex-col">
                                    <p className="border-b">Pembina Utama/IV C</p>
                                    <p>Kepala</p>
                                </div>
                            </td>
                            <td className="border border-blue-500 px-6 py-4">Penanggung Jawab</td>
                            <td className="border border-blue-500 px-6 py-4">5.000.000</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">100</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">90</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">90</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">93</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">93%</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">4.666.000</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">15%</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">5%</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">-</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">-</td>
                            <td className="border border-blue-500 px-6 py-4 text-center"></td>
                        </tr>
                        <tr>
                            <td className="border-b border-blue-500 px-6 py-4 text-center">2</td>
                            <td className="border border-blue-500 px-6 py-4">
                                <div className="flex flex-col">
                                    <p className="border-b">Siska</p>
                                    <p>10928309182301232</p>
                                </div>
                            </td>
                            <td className="border border-blue-500 px-6 py-4">
                                <div className="flex flex-col">
                                    <p className="border-b">Pembina/IV A</p>
                                    <p>Sekretaris</p>
                                </div>
                            </td>
                            <td className="border border-blue-500 px-6 py-4">Sekretaris</td>
                            <td className="border border-blue-500 px-6 py-4">3.000.000</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">100</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">90</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">90</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">93</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">93%</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">4.666.000</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">15%</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">5%</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">-</td>
                            <td className="border border-blue-500 px-6 py-4 text-center">-</td>
                            <td className="border border-blue-500 px-6 py-4 text-center"></td>
                        </tr>
                    </tbody>
                </table>
            </TableComponent>
        </>
    )
}

export default Table;