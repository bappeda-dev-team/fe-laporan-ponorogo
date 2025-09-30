'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup, TbDeviceFloppy, TbX } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelInput } from "@/components/global/input";
import { ButtonSky, ButtonRed } from "@/components/button/button";
import { TimGetResponse } from "@/types/tim";
import { apiFetch } from "@/lib/apiFetch";
import useToast from "@/components/global/toast";
import { AlertNotification } from "@/components/global/sweetalert2";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "baru" | "edit";
    data?: TimGetResponse;
}
interface FormValue {
    is_active: boolean;
    keterangan: string;
    kode_tim: string;
    nama_tim: string;
    tahun: string;
}

export const ModalTim: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, data }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            is_active: true,
            keterangan: "",
            kode_tim: data?.kode_tim,
            nama_tim: data?.nama_tim,
            tahun: "2025"
        }
    })

    const [Proses, setProses] = useState<boolean>(false);
    const { toastError, toastSuccess } = useToast();

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        // backend tidak terima formdata
        const payload = {
            nama_tim: data.nama_tim,
            keterangan: data.keterangan,
            is_active: true,
            tahun: "2025"
        }

        // console.log("Memeriksa Isi FormData:");
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }
        await apiFetch("/api/v1/timkerja/timkerja", {
            method: jenis === "baru" ? "POST" : "PUT",
            body: payload as any
        }).then(_ => {
            toastSuccess("data berhasil disimpan");
            onSuccess();
        }).catch(err => {
            AlertNotification("Gagal", `${err}`, "error", 3000, true);
        })
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
                    {jenis === "baru" ? "Tambah" : "Edit"} Tim {jenis === "edit" && `code : ${data?.kode_tim || "no code"}`}
                </h1>
            </div>
            <form className="flex flex-col mx-5 py-5 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="nama_tim"
                    control={control}
                    rules={{ required: "nama tim wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="nama_tim"
                                label="nama tim"
                            />
                            {errors.nama_tim &&
                                <p className="text-red-400 italic">{errors.nama_tim.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="keterangan"
                    control={control}
                    render={({ field }) => (
                        <FloatingLabelInput
                            {...field}
                            id="keterangan"
                            label="keterangan"
                        />
                    )}
                />
                <div className="flex flex-col gap-2 mt-3">
                    <ButtonSky
                        className="w-full"
                        type="submit"
                        disabled={Proses}
                    >
                        {Proses ?
                            <span className="flex">
                                Menyimpan...
                            </span>
                            :
                            <span className="flex items-center gap-1">
                                <TbDeviceFloppy />
                                Simpan
                            </span>
                        }
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
