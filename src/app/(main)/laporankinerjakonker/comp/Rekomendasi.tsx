'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { FloatingLabelTextarea } from "@/components/global/input";

interface Rekomendasi {
    rekomendasi: string;
}

export const Rekomendasi: React.FC<Rekomendasi> = ({ rekomendasi }) => {

    const [Editing, setEditing] = useState<boolean>(false);

    if (Editing) {
        return (
            <FormRekomendasi 
                rekomendasi={rekomendasi} 
                onClose={() => setEditing(false)}
            />
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                {rekomendasi || ""}
                <button
                    className="p-1 rounded-xl w-full flex justify-center items-center gap-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-300 hover:text-white cursor-pointer"
                    type="button"
                    onClick={() => {
                        setEditing(true);
                    }}
                >
                    <TbPencil />
                    Edit
                </button>
            </div>
        )
    }
}

interface FormRekomendasi {
    rekomendasi: string;
    onClose: () => void;
}
interface FormValue {
    rekomendasi_tindak_lanjut: string;
}

export const FormRekomendasi: React.FC<FormRekomendasi> = ({ rekomendasi, onClose }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            rekomendasi_tindak_lanjut: rekomendasi,
        }
    });
    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormValue> = async(data) => {
        const payload = {
            rekomendasi_tindak_lanjut: data.rekomendasi_tindak_lanjut,
        }
        // console.log(payload);
        setHasilEdit(data.rekomendasi_tindak_lanjut);
        setEdited(true);
        toastSuccess("data dummy");
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    if(Edited){
        return(
            <Rekomendasi rekomendasi={HasilEdit || ""}/>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        name="rekomendasi_tindak_lanjut"
                        rules={{ required: "tidak boleh kosong" }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <FloatingLabelTextarea 
                                    {...field}
                                    id="rekomendasi_tindak_lanjut"
                                    label="Rekomendasi"
                                />
                                {errors.rekomendasi_tindak_lanjut &&
                                    <p className="text-xs italic text-red-500">{errors.rekomendasi_tindak_lanjut?.message}</p>
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