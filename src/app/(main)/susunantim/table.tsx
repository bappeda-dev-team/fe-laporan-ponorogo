import TableAnggota from "./TableAnggota";
import { ButtonSkyBorder } from "@/components/button/button";
import { TbCirclePlus } from "react-icons/tb";

export const Table = () => {
    return (
        <div className="flex flex-col gap-2">
            <ButtonSkyBorder className="flex items-center gap-1">
                <TbCirclePlus />
                Tambah Tim
            </ButtonSkyBorder>
            <TableAnggota />            
        </div>
    )
}