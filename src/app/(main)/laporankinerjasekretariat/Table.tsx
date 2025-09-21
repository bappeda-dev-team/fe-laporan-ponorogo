import TableComponent from "@/components/page/TableComponent";

export const Table = () => {
    return (
        <>
            <TableComponent className="border-blue-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-blue-500">
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
                        <tr className="text-white bg-blue-600">
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
                            <td className="border-b border-blue-500 px-6 py-4 text-center">1</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                            <td className="border border-blue-500 px-6 py-4">-</td>
                        </tr>
                    </tbody>
                </table>
            </TableComponent>
        </>
    )
}