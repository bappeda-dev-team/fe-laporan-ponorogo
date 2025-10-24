'use client'

import TableComponent from "@/components/page/TableComponent";
import { useGet } from "@/app/hooks/useGet";
import { TbPencil } from "react-icons/tb";
import { apiFetch } from "@/lib/apiFetch";
import { PegawaiGetResponse } from "@/types/tim";
import { useEffect, useState } from "react";
import { ButtonSky } from "@/components/button/button";
import { ModalJabatanPegawai } from "./ModalJabatanPegawai";

const TablePegawai = () => {

    const kode_opd = process.env.NEXT_PUBLIC_KODE_OPD;
    // const { data, loading, error, message } = useGet<PegawaiGetResponse[]>(`/api/v1/tpp/pegawai/detail/master/opd/OPD-001`);

    const [Data, setData] = useState<any>(null);
    const [Loading, setLoading] = useState<boolean>(true);
    const [Error, setError] = useState<boolean>(false);
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);

    const [ModalJabatan, setModalJabatan] = useState<boolean>(false);
    const [JenisModal, setJenisModal] = useState<"baru" | "edit" | "">("");
    const [DataJabatan, setDataJabatan] = useState<PegawaiGetResponse | null>(null);

    const handleModalJabatan = (data: PegawaiGetResponse | null, jenis: "baru" | "edit" | "") => {
        if(ModalJabatan){
            setDataJabatan(null);
            setModalJabatan(false);
            setJenisModal(jenis);
        } else {
            setDataJabatan(data);
            setModalJabatan(true);
            setJenisModal(jenis);
        }
    }

    useEffect(() => {
        const fetchPegawai = async() => {
            try{
                setLoading(true);
                apiFetch(`/api/v1/tpp/pegawai/detail/master/opd/OPD-001`)
                .then(resp => {
                    setData(resp);
                }).catch(err => {
                    console.log(err);
                    setError(true);
                })
            } catch(err){
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchPegawai();
    }, [FetchTrigger]);

    if (Loading) {
        return (
            <h1>Loading...</h1>
        )
    } else if (Error) {
        return (
            <h1 className="text-red-400">error saat mengambil data master pegawai</h1>
        )
    } else if (!Loading && !Error && Data != null){
        return (
            <TableComponent className="border-yellow-500">
                <table className="w-full">
                    <thead>
                        <tr className="text-white bg-yellow-500">
                            <th className="border-r border-b py-3 px-4 border-gray-300 w-[50px] text-center">No</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Nama Pegawai</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[100px] text-center">NIP</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Jabatan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Status Jabatan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Eselon</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[200px] text-center">Pangkat / Golongan</th>
                            <th className="border-r border-b py-3 px-4 border-gray-300 min-w-[100px] text-center">Nama Perangkat Daerah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data != null ?
                            Data.map((item: PegawaiGetResponse, index: number) => (
                                    <tr key={index}>
                                        <td className="border py-3 px-4 border-yellow-500 text-center">{index + 1}</td>
                                        <td className="border py-3 px-4 border-yellow-500">{item.namaPegawai || "-"}</td>
                                        <td className="border py-3 px-4 border-yellow-500 text-center">{item.nip || "-"}</td>
                                        <td className="border py-3 px-4 border-yellow-500">
                                            <div className="flex items-center justify-between gap-1">
                                                {item.namaJabatan || "-"}
                                                <ButtonSky 
                                                    className="flex items-center gap-1"
                                                    onClick={() => handleModalJabatan(item, item?.namaJabatan ? "edit" : "baru")}
                                                >
                                                    <TbPencil />
                                                    Edit
                                                </ButtonSky>
                                            </div>
                                        </td>
                                        <td className="border py-3 px-4 border-yellow-500 text-center">{item.statusJabatan || "-"}</td>
                                        <td className="border py-3 px-4 border-yellow-500 text-center">{item.eselon || "-"}</td>
                                        <td className="border py-3 px-4 border-yellow-500 text-center">{item.pangkat || "-"} / {item.golongan || "-"}</td>
                                        <td className="border py-3 px-4 border-yellow-500 text-center">{item.namaOpd || "-"}</td>
                                    </tr>
                                ))
                            :
                            <tr>
                                <td colSpan={5} className="border border-yellow-500 px-6 py-4">Data Pegawai Kosong</td>
                            </tr>
                        }
                    </tbody>
                </table>
                {ModalJabatan &&
                    <ModalJabatanPegawai 
                        isOpen={ModalJabatan}
                        onClose={() => handleModalJabatan(null, "")}
                        onSuccess={() => setFetchTrigger((prev) => !prev)}
                        Data={DataJabatan}
                        jenis={JenisModal}
                    />
                }
            </TableComponent>
        )
    }
}

export default TablePegawai;