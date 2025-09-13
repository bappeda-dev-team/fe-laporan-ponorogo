import TableComponent from "@/components/page/TableComponent";

const TableAnggota = () => {
    return (
        <TableComponent className="border-emerald-500">
            <table className="w-full">
                <thead>
                    <tr className="text-white bg-emerald-500">
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[50px] text-center">No</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nama</th>
                        <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">NIP</th>
                        <th className="border-r border-b py-2 px-3 border-gray-300 min-w-[200px] text-center">Jabatan Dalam Tim</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[100px] text-center">Nilai Person</th>
                        <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Keterangan</th>
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
                    <tr>
                        <td className="border-b border-emerald-500 px-6 py-4 text-center">1</td>
                        <td className="border border-emerald-500 px-6 py-4">Ryan Brilian</td>
                        <td className="border border-emerald-500 px-6 py-4">1023081723071</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">Ketua</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">100</td>
                        <td className="border border-emerald-500 px-6 py-4">-</td>
                    </tr>
                    <tr>
                        <td className="border-b border-emerald-500 px-6 py-4 text-center">2</td>
                        <td className="border border-emerald-500 px-6 py-4">Ilham Akbar</td>
                        <td className="border border-emerald-500 px-6 py-4">0192730172093</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">Wakil Ketua</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">100</td>
                        <td className="border border-emerald-500 px-6 py-4">-</td>
                    </tr>
                    <tr>
                        <td className="border-b border-emerald-500 px-6 py-4 text-center">3</td>
                        <td className="border border-emerald-500 px-6 py-4">Agnar Brian</td>
                        <td className="border border-emerald-500 px-6 py-4">1241325423513</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">Anggota</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">100</td>
                        <td className="border border-emerald-500 px-6 py-4">-</td>
                    </tr>
                    <tr>
                        <td className="border-b border-emerald-500 px-6 py-4 text-center">4</td>
                        <td className="border border-emerald-500 px-6 py-4">Myko Akbar</td>
                        <td className="border border-emerald-500 px-6 py-4">1241234134645</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">Anggota</td>
                        <td className="border border-emerald-500 px-6 py-4 text-center">100</td>
                        <td className="border border-emerald-500 px-6 py-4">-</td>
                    </tr>
                </tbody>
            </table>
        </TableComponent>
    )
}

export default TableAnggota;