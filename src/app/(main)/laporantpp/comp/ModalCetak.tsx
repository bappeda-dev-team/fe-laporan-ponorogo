'use client'

import { useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup, TbX, TbPrinter } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelInput } from "@/components/global/input";
import { ButtonSky, ButtonRed } from "@/components/button/button";
import { PenilaianTimResponse } from "@/types/penilaian_tpp";
import { useCetakTpp } from "../lib/useCetakTpp";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    data: PenilaianTimResponse | null;
}
interface FormValue {
    tanggal: string;
}

export const ModalCetakTpp: React.FC<Modal> = ({ isOpen, onClose, data }) => {

    const [Sekretariat, setSekretariat] = useState<boolean>(false);
    const [Tanggal, setTanggal] = useState<string>("");
        const { cetakPdf } = useCetakTpp(data ?? null, data?.nama_tim ?? "", data?.keterangan ?? "", data?.is_sekretariat ?? false, Tanggal);

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            tanggal: "",
        }
    });

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        // console.log(payload);
        setTanggal(data.tanggal);
        if(data.tanggal){
            cetakPdf();
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
                    Cetak TPP
                </h1>
            </div>
            <form className="flex flex-col mx-5 py-5 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="tanggal"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="tanggal"
                                label="tanggal tertanda"
                                type="number"
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
