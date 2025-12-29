'use client'

import { useState } from "react";
import { Table } from "./comp/table";
import { ButtonBlackBorder } from "@/components/button/button";
import { useGet } from "@/app/hooks/useGet";
import { PenilaianTimResponse } from "@/types/penilaian_tpp";
import { useBrandingContext } from "@/provider/BrandingProvider";
import { LoadingButtonClip } from "@/components/global/Loading";
import { TbPrinter } from "react-icons/tb";
import { GetResponseFindAllTppAllTim } from "./type";
import { useCetakTppAllTim } from "./lib/useCetakTppAllTim";
import { ModalCetakTpp } from "./comp/ModalCetak";

const LaporanTpp = () => {
    const [FetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const { branding } = useBrandingContext();
    const queryParams = `tahun=${branding?.tahun?.value}&bulan=${branding?.bulan?.value}`
    const { data, loading, error, message } = useGet<PenilaianTimResponse[]>(`/api/v1/timkerja/laporan_tpp?${queryParams}`, FetchTrigger);
    const { data: AllTim, loading: LoadingAllTim, error: ErrorAllTim, message: MessageAllTim } = useGet<GetResponseFindAllTppAllTim[]>(`/api/v1/timkerja/laporan_tpp_all?${queryParams}`, FetchTrigger);


    const [ModalCetak, setModalCetak] = useState<boolean>(false);
    const handleModalCetak = () => {
        if (ModalCetak) {
            setModalCetak(false);
        } else {
            setModalCetak(true);
        }
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    } else if (error) {
        return (
            <h1>{message || "-"}</h1>
        )
    } else {
        return (
            <div className="flex flex-col gap-2">
                {data && data?.length > 0 ?
                    <>
                        <ButtonBlackBorder
                            className="flex items-center gap-1"
                            disabled={LoadingAllTim || ErrorAllTim}
                            onClick={() => handleModalCetak()}
                        >
                            {LoadingAllTim ?
                                <>
                                    <LoadingButtonClip />
                                    Loading...
                                </>
                                :
                                <>
                                    <TbPrinter />
                                    Cetak Semua Tim
                                </>
                            }
                        </ButtonBlackBorder>
                        {data?.map((item: PenilaianTimResponse, index: number) => (
                            <div key={index} className="flex flex-col gap-2">
                                <Table data={item} />
                            </div>
                        ))}
                        {ModalCetak &&
                            <ModalCetakTpp
                                isOpen={ModalCetak}
                                onClose={() => handleModalCetak()}
                                DataAllTim={AllTim ?? []}
                                jenis="all"
                            />
                        }
                    </>
                    :
                    <p>Laporan Bulan {branding?.bulan?.label || ""} {branding?.tahun?.label || ""} masih kosong</p>
                }
            </div>
        )
    }
}

export default LaporanTpp;
