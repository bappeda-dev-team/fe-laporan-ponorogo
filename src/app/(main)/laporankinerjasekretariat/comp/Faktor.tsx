'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { FloatingLabelTextarea } from "@/components/global/input";

interface Faktor {
    faktor: string;
    jenis: "penghambat" | "pendorong";
}

export const Faktor: React.FC<Faktor> = ({ faktor, jenis }) => {

    const [Editing, setEditing] = useState<boolean>(false);

    if (Editing) {
        return (
            <FormFaktor 
                faktor={faktor} 
                jenis={jenis}
                onClose={() => setEditing(false)}
            />
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                {faktor || ""}
                <button
                    className="p-1 rounded-xl w-full flex items-center justify-center gap-1 border border-emerald-500 text-emerald-500 hover:bg-emerald-300 hover:text-white cursor-pointer"
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

interface FormFaktor {
    faktor: string;
    jenis: 'pendorong' | 'penghambat';
    onClose: () => void;
}
interface FormValue {
    faktor: string;
}

export const FormFaktor: React.FC<FormFaktor> = ({ faktor, jenis, onClose }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            faktor: faktor,
        }
    });
    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormValue> = async(data) => {
        const payload_pendorong = {
            faktor_pendorong: data.faktor,
        }
        const payload_penghambat = {
            faktor_penghambat: data.faktor,
        }
        // console.log(payload);
        setHasilEdit(data.faktor);
        setEdited(true);
        toastSuccess("data dummy");
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    if(Edited){
        return(
            <Faktor faktor={HasilEdit || ""} jenis={jenis}/>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        name="faktor"
                        rules={{ required: "tidak boleh kosong" }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <FloatingLabelTextarea 
                                    {...field}
                                    id="faktor"
                                    label={`${jenis === "pendorong" ? "faktor pendorong" : "faktor penghambat"}`}
                                />
                                {errors.faktor &&
                                    <p className="text-xs italic text-red-500">{errors.faktor?.message}</p>
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