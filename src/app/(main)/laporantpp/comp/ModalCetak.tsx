'use client'

import { useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup, TbX, TbPrinter } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ButtonSky, ButtonRed } from "@/components/button/button";
import { PenilaianTimResponse } from "@/types/penilaian_tpp";
import { useCetakTpp } from "../lib/useCetakTpp";
import { AlertNotification } from "@/components/global/sweetalert2";
import { GetResponseFindAllTppAllTim } from "../type";
import { useCetakTppAllTim } from "../lib/useCetakTppAllTim";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    jenis: "tim" | "all";
    DataPerTim?: PenilaianTimResponse | null;
    DataAllTim?: GetResponseFindAllTppAllTim[];
}
interface FormValue {
    tanggal: string;
}

export const ModalCetakTpp: React.FC<Modal> = ({ isOpen, onClose, jenis, DataPerTim, DataAllTim }) => {

    const [Tanggal, setTanggal] = useState<string>("");
    const { cetakPdf } = useCetakTpp(
        DataPerTim ?? null,
        DataPerTim?.nama_tim ?? "",
        DataPerTim?.keterangan ?? "",
        DataPerTim?.is_sekretariat ?? false,
        Tanggal
    );

    const { cetakPdfAllTim } = useCetakTppAllTim(
        DataAllTim ?? [],
        Tanggal
    );

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            tanggal: "",
        }
    });

    const onSubmit: SubmitHandler<FormValue> = (data) => {
        if (data.tanggal && (jenis === "tim" )) {
            // console.log(Tanggal);
            cetakPdf();
        } else if(data.tanggal && (jenis === "all")){
            cetakPdfAllTim();
        } else {
            AlertNotification("Tanggal Masih Kosong", "", "warning", 2000, true);
        }
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <div className="w-max-[500px] mb-2 border-b border-blue-500 text-blue-500">
                <h1 className="flex items-center justify-center gap-1 text-xl uppercase font-semibold pb-1">
                    <TbUsersGroup />
                    Cetak TPP {jenis}
                </h1>
            </div>
            <form className="flex flex-col mx-5 py-5 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="tanggal"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <input
                                {...field}
                                id="tanggal"
                                maxLength={2}
                                className="border py-2 px-3 rounded-lg"
                                placeholder="masukkan tanggal tertanda"
                                type="number"
                                onChange={(e) => {
                                    field.onChange(e);
                                    setTanggal(e.target.value);
                                }}
                            />
                            {errors.tanggal &&
                                <p className="text-red-400 italic">{errors.tanggal.message}</p>
                            }
                        </>
                    )}
                />
                <div className="flex flex-col gap-2 mt-3">
                    <ButtonSky
                        className="w-full flex items-center gap-1"
                        type="submit"
                    >
                        <TbPrinter />
                        Cetak
                    </ButtonSky>
                    <ButtonRed className="w-full flex items-center gap-1" type="button" onClick={handleClose}>
                        <TbX />
                        Batal
                    </ButtonRed>
                </div>
            </form>
        </ModalComponent>
    )
}
