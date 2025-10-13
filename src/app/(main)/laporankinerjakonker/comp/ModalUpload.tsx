'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbFileIsr, TbDeviceFloppy, TbX } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ButtonSky, ButtonRed } from "@/components/button/button";
import { TimGetResponse } from "@/types/tim";
import { apiFetch } from "@/lib/apiFetch";
import useToast from "@/components/global/toast";
import { AlertNotification } from "@/components/global/sweetalert2";
import { useGet } from "@/app/hooks/useGet";
import { ProgramUnggulanGetResponse, OptionType } from "@/types";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    Data?: TimGetResponse | null;
}
interface FormValue {
    file: File[];
}

export const ModalUpload: React.FC<Modal> = ({ isOpen, onClose, onSuccess, Data }) => {

    // const opd = process.env.NEXT_PUBLIC_KODE_OPD;

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>();

    const [Proses, setProses] = useState<boolean>(false);
    const { toastError, toastSuccess } = useToast();

    const { data, error, loading } = useGet<ProgramUnggulanGetResponse[]>(`/api/v1/perencanaan/program_unggulan/findall/2025/2030`)

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const url_pdf = "https://kab-bontang-upload.zeabur.app"
        const formData = new FormData();

        formData.append('file', data.file[0]);

        console.log(formData);
        // try {
        //     setProses(true);
        //     const response = await fetch(`${url_pdf}/upload`, {
        //         method: "POST",
        //         body: formData,
        //     });
        //     const result = await response.json();
        //     if (response.ok) {
        //         // console.log(result);
        //         AlertNotification("Berhasil", "file berhasil di upload", "success", 2000, true);
        //         setTimeout(() => {
        //             window.location.reload();
        //         }, 1000);
        //     } else {
        //         console.log(result);
        //         AlertNotification("Gagal", `${result}`, "error", 2000, true);
        //     }
        // } catch (err) {
        //     console.error(err);
        //     AlertNotification("Gagal", "cek koneksi internet, terdapat kesalahan server/backend, jika terus berlanjut hubungi tim developer", "error", 2000, true);
        // } finally {
        //     setProses(false);
        // }
    };

    const handleClose = () => {
        onClose();
        reset();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <div className="w-max-[500px] mb-2 border-b border-blue-500 text-blue-500">
                <h1 className="flex items-center justify-center gap-1 text-xl uppercase font-semibold pb-1">
                    <TbFileIsr />
                    Upload Bukti Pendukung
                </h1>
            </div>
            <form className="flex flex-col mx-5 py-5 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col py-3">
                    <label
                        className="uppercase text-xs font-bold text-gray-700 my-2"
                        htmlFor="file"
                    >
                        File:
                    </label>
                    <Controller
                        name="file"
                        rules={{ required: "file harus terisi" }}
                        control={control}
                        render={({ field: { onBlur, onChange, ref } }) => (
                            <input
                                className="border px-4 py-2 rounded-lg hover:bg-blue-500 hover:border-white hover:text-white cursor-pointer"
                                id="file"
                                onChange={(e) => onChange(e.target.files)}
                                type="file"
                                onBlur={onBlur}
                                ref={ref}
                            />
                        )}
                    />
                </div>
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
