import TableComponent from "@/components/page/TableComponent";

const TableLaporan = () => {
    return (
        <TableComponent className="border-blue-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-blue-500">
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nama Program Unggulan</th>
                        <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Pohon Kinerja</th>
                        <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Indikator Kinerja</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[150px] text-center">Target Tahun</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Perangkat Daerah</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Sub Kegiatan</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Pagu Anggaran</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Realisasi Anggaran</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rencana Aksi</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Faktor Pendorong</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Faktor Penghambat</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Rekomendasi Tindak Lanjut</th>
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-blue-500 px-6 py-4 text-center">1</td>
                        <td className="border border-blue-500 px-6 py-4">Program 1 T</td>
                        <td className="border border-blue-500 px-6 py-4">Pelaksanaan Program didalam lingkup Bappeda</td>
                        <td className="border border-blue-500 px-6 py-4">indikator program 1 T</td>
                        <td className="border border-blue-500 px-6 py-4">30</td>
                        <td className="border border-blue-500 px-6 py-4">Badan Perencanaan Penelitian dan Pengembangan Daerah</td>
                        <td className="border border-blue-500 px-6 py-4">(5.01.02.2.01) Penyusunan dan Perancangan</td>
                        <td className="border border-blue-500 px-6 py-4">2.000.000</td>
                        <td className="border border-blue-500 px-6 py-4">5.000.000</td>
                        <td className="border border-blue-500 px-6 py-4">contoh rencana aksi</td>
                        <td className="border border-blue-500 px-6 py-4">contoh faktor pendorong</td>
                        <td className="border border-blue-500 px-6 py-4">contoh faktor penghambat</td>
                        <td className="border-b border-blue-500 px-6 py-4">rekomendasi tindak lanjut</td>
                    </tr>
                    <tr>
                        <td className="border-b border-blue-500 px-6 py-4 text-center">2</td>
                        <td className="border border-blue-500 px-6 py-4">Program 1 T</td>
                        <td className="border border-blue-500 px-6 py-4">Pelaksanaan Program didalam lingkup Bappeda</td>
                        <td className="border border-blue-500 px-6 py-4">indikator program 1 T</td>
                        <td className="border border-blue-500 px-6 py-4">30</td>
                        <td className="border border-blue-500 px-6 py-4">Badan Perencanaan Penelitian dan Pengembangan Daerah</td>
                        <td className="border border-blue-500 px-6 py-4">(5.01.02.2.01) Penyusunan dan Perancangan</td>
                        <td className="border border-blue-500 px-6 py-4">2.000.000</td>
                        <td className="border border-blue-500 px-6 py-4">5.000.000</td>
                        <td className="border border-blue-500 px-6 py-4">contoh rencana aksi</td>
                        <td className="border border-blue-500 px-6 py-4">contoh faktor pendorong</td>
                        <td className="border border-blue-500 px-6 py-4">contoh faktor penghambat</td>
                        <td className="border-b border-blue-500 px-6 py-4">rekomendasi tindak lanjut</td>
                    </tr>
                </tbody>
            </table>
        </TableComponent>
    )
}

export default TableLaporan;