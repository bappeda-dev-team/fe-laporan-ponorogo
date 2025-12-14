import TableComponent from "@/components/page/TableComponent";
import { NilaiKinerja } from "./NilaiKinerja";
import { NilaiTim } from "./NilaiTim";
import { NilaiPerson } from "./NilaiPerson";
//import { TbCircleCheck } from "react-icons/tb";
import { PenilaianKinerjas } from "../type";

interface Table {
    data: any;
}

const Table: React.FC<Table> = ({ data }) => {
    
    return (
        <div className={`flex flex-col p-2 border-2 rounded-lg ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"}`}>
            <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex flex-col">
                    <h1 className="uppercase font-bold text-2xl">Penilaian Tim: {data.nama_tim || "-"}</h1>
                    {data.is_sekretariat ?
                        <h1 className="font-medium">Penilaian Tim Sekretariat - {data.keterangan || ""}</h1>
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
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Kinerja Bappeda</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Kerja Tim</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Kerja Person</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nilai Akhir</th>
                        </tr>
                        <tr className={`text-white ${data.is_sekretariat ? "bg-emerald-600" : "bg-blue-600"}`}>
                            <th className="border-r border-b py-1 border-gray-300 text-center">1</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">2</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">3</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">4</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">5</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">6</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">7</th>
                            <th className="border-r border-b py-1 border-gray-300 text-center">8</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.penilaian_kinerjas ?
                            data?.penilaian_kinerjas
                                .slice()
                                .map((item: PenilaianKinerjas, index: number) => (
                                    <tr key={index}>
                                        <td className={`border-b ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>{index + 1}</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>
                                            <div className="flex flex-col">
                                                <p className={`border-b ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"}`}>{item.nama_pegawai || "-"}</p>
                                                <p className="font-semibold">{item.id_pegawai || "-"}</p>
                                            </div>
                                        </td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>
                                            <div className="flex flex-col">
                                                <p className="border-b">{item.pangkat || "-"} / {item.golongan || "-"}</p>
                                                <p>{item.nama_jabatan_tim || "-"}</p>
                                            </div>
                                        </td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>{item.nama_jabatan_tim || "-"}</td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}><NilaiKinerja nilai={item.kinerja_bappeda || 0} kode_tim={data.kode_tim} Data={item}/></td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}><NilaiTim nilai={item.kinerja_tim || 0} kode_tim={data.kode_tim} Data={item}/></td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}><NilaiPerson nilai={item.kinerja_person || 0} kode_tim={data.kode_tim} Data={item} /></td>
                                        <td className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4 text-center`}>{item.nilai_akhir || 0}</td>
                                    </tr>
                                ))
                            :
                            <tr>
                                <td colSpan={9} className={`border ${data.is_sekretariat ? "border-emerald-500" : "border-blue-500"} px-6 py-4`}>Data Anggota Kosong</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </TableComponent>
        </div>
    )
}

export default Table;
