'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { formatRupiah } from "@/app/hooks/formatRupiah";
import { FloatingLabelInput } from "@/components/global/input";

interface Realisasi {
    anggaran: number;
}

export const Realisasi: React.FC<Realisasi> = ({ anggaran }) => {

    const [Editing, setEditing] = useState<boolean>(false);

    if (Editing) {
        return (
            <FormRealisasi 
                anggaran={anggaran} 
                onClose={() => setEditing(false)}
            />
        )
    } else {
        return (
            <div className="flex items-center justify-center gap-2">
                Rp.{formatRupiah(anggaran || 0)}
                <button
                    className="p-1 rounded-full border border-emerald-500 text-emerald-500 hover:bg-emerald-300 hover:text-white cursor-pointer"
                    type="button"
                    onClick={() => {
                        setEditing(true);
                    }}
                >
                    <TbPencil />
                </button>
            </div>
        )
    }
}

interface FormRealisasi {
    anggaran: number;
    onClose: () => void;
}
interface FormValue {
    realisasi_anggaran: number;
}

export const FormRealisasi: React.FC<FormRealisasi> = ({ anggaran, onClose }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            realisasi_anggaran: anggaran,
        }
    });
    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<number | null>(null);

    const onSubmit: SubmitHandler<FormValue> = async(data) => {
        const payload = {
            realisasi_anggaran: Number(data.realisasi_anggaran),
        }
        // console.log(payload);
        setHasilEdit(data.realisasi_anggaran);
        setEdited(true);
        toastSuccess("data dummy");
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    if(Edited){
        return(
            <Realisasi anggaran={HasilEdit || 0}/>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        name="realisasi_anggaran"
                        rules={{ required: "tidak boleh kosong" }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <FloatingLabelInput 
                                    {...field}
                                    id="anggaran"
                                    label="anggaran"
                                    type="number"
                                />
                                {errors.realisasi_anggaran &&
                                    <p className="text-xs italic text-red-500">{errors.realisasi_anggaran?.message}</p>
                                }
                            </>
                        )}
                    />
                    <div className="flex justify-center items-center gap-1 w-full">
                        <ButtonRedBorder 
                            type="button" 
                            onClick={handleClose}
                        >
                            <TbX />
                        </ButtonRedBorder>
                        <ButtonGreenBorder type="submit">
                            <TbDeviceFloppy />
                        </ButtonGreenBorder>
                    </div>
                </form>
            </div>
        )
    }
}