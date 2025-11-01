'use client'

import { useState, useEffect } from "react";
import { TbBadgesFilled, TbUsersGroup } from "react-icons/tb";
import TableJabatan from "./comp/TableJabatan";
import TablePegawai from "./comp/TablePegawai";

const DataMaster = () => {

    const [Menu, setMenu] = useState<string>('jabatan');

    return (
        <div className="grid">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                    className={`flex items-center gap-1 py-1 px-3 min-w-[200px] justify-center border rounded-lg cursor-pointer ${Menu === 'pegawai' ? "bg-yellow-500 border-yellow-500 text-white" : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"}`}
                    onClick={() => {
                        if (Menu != "pegawai") {
                            setMenu("pegawai")
                        }
                    }}
                >
                    <TbUsersGroup />
                    Master Pegawai
                </button>
                <button
                    className={`flex items-center gap-1 py-1 px-3 min-w-[200px] justify-center border rounded-lg cursor-pointer ${Menu === 'jabatan' ? "bg-yellow-500 border-yellow-500 text-white" : "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"}`}
                    onClick={() => {
                        if (Menu != "jabatan") {
                            setMenu("jabatan")
                        }
                    }}
                >
                    <TbBadgesFilled />
                    Master Jabatan
                </button>
            </div>
            {Menu === "jabatan" &&
                <TableJabatan />
            }
            {Menu === "pegawai" &&
                <TablePegawai />
            }
        </div>
    )
}

export default DataMaster;