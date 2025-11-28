'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { formatRupiah } from "@/app/hooks/formatRupiah";
import { FloatingLabelTextarea } from "@/components/global/input";

interface RencanaAksi {
    renaksi: string;
}

export const RencanaAksi: React.FC<RencanaAksi> = ({ renaksi }) => {

    const [Editing, setEditing] = useState<boolean>(false);

    if (Editing) {
        return (
            <FormRencanaAksi 
                renaksi={renaksi} 
                onClose={() => setEditing(false)}
            />
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                {renaksi || ""}
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

interface FormRencanaAksi {
    renaksi: string;
    onClose: () => void;
}
interface FormValue {
    rencana_aksi: string;
}

export const FormRencanaAksi: React.FC<FormRencanaAksi> = ({ renaksi, onClose }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            rencana_aksi: renaksi,
        }
    });
    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormValue> = async(data) => {
        const payload = {
            rencana_aksi: data.rencana_aksi,
        }
        // console.log(payload);
        setHasilEdit(data.rencana_aksi);
        setEdited(true);
        toastSuccess("data dummy");
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    if(Edited){
        return(
            <RencanaAksi renaksi={HasilEdit || ""}/>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        name="rencana_aksi"
                        rules={{ required: "tidak boleh kosong" }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <FloatingLabelTextarea 
                                    {...field}
                                    id="rencana_aksi"
                                    label="rencana aksi"
                                />
                                {errors.rencana_aksi &&
                                    <p className="text-xs italic text-red-500">{errors.rencana_aksi?.message}</p>
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