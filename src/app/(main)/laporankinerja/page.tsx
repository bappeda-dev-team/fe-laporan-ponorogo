import TableLaporan from "./table/TableLaporan";
import { TbCircleFilled } from "react-icons/tb";

const laporantpp = () => {
    return (
        <>
            <div className="flex items-start gap-1 my-1">
                <TbCircleFilled className="mt-1 text-blue-500" />
                <div className="flex flex-col">
                    <h1 className="font-semibold">Laporan Kinerja Program Unggulan Bupati Ponorogo</h1>
                    <h3>Tim Monev Pembangunan 1</h3>
                </div>
            </div>
            <TableLaporan />
        </>
    )
}

export default laporantpp;