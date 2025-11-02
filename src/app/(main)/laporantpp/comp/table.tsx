import TableComponent from "@/components/page/TableComponent";
import { TbCircleCheck } from "react-icons/tb";
import { TimGetResponse, AnggotaGetResponse } from "@/types/tim";

interface Table {
    data: TimGetResponse;
}
export const Table: React.FC<Table> = ({ data }) => {
    return (
        <div className={`flex flex-col p-2 border-2 rounded-lg ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"}`}>
            <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex flex-col">
                    <h1 className="uppercase font-bold text-2xl">TPP Konker: {data.nama_tim || "-"}</h1>
                    {data.is_sekretariat ?
                        <h1 className="font-medium">TPP Konker Sekretariat - {data.keterangan || ""}</h1>
                        :
                        <h1 className="font-medium">{data.keterangan || ""}</h1>
                    }
                </div>
            </div>
            <TableComponent className={`${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"}`}>
                <table className="w-full">
                    <thead>
                        <tr className={`text-white ${data.is_sekretariat ? "bg-emerald-500" : "bg-blue-500"}`}>
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
                        <tr className={`text-white ${data.is_sekretariat ? "bg-emerald-600" : "bg-blue-600"} `}>
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
                        {data?.susunan_tims ?
                            data?.susunan_tims
                                .slice()
                                .sort((a, b) => a.level_jabatan - b.level_jabatan)
                                .map((item: AnggotaGetResponse, index: number) => (
                                    <tr key={index}>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>{index + 1}</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>
                                            <div className="flex flex-col">
                                                <p className="border-b">{item.nama_pegawai || "-"}</p>
                                                <p>{item.nip || "-"}</p>
                                            </div>
                                        </td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>
                                            <div className="flex flex-col">
                                                <p className="border-b">Pembina Utama/IV C</p>
                                                <p>Kepala</p>
                                            </div>
                                        </td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>Penanggung Jawab</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>5.000.000</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>100</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>90</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>90</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>93</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>93%</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>4.666.000</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>15%</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>5%</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>-</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>-</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}></td>
                                    </tr>
                                ))
                            :
                            <tr>
                                <td colSpan={16} className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>Data Anggota Kosong</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </TableComponent>
        </div>
    )
}