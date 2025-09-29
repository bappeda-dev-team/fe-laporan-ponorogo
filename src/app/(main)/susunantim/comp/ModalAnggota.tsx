'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup, TbDeviceFloppy, TbX } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelInput, FloatingLabelSelect } from "@/components/global/input";
import { ButtonSky, ButtonRed } from "@/components/button/button";
import { OptionTypeString } from "@/types";
import { apiFetch } from "@/lib/apiFetch";
import { AnggotaGetResponse } from "@/types/tim";
import { AlertNotification } from "@/components/global/sweetalert2";
import useToast from "@/components/global/toast";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "baru" | "edit" | "";
    kode_tim: string;
    data?: AnggotaGetResponse | null;
}
interface FormValue {
    is_active: boolean;
    keterangan: string;
    kode_tim: string;
    nama_jabatan_tim: string;
    nama_pegawai: string;
    nip: string;
}

export const ModalAnggota: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, kode_tim, data }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            is_active: data?.is_active,
            keterangan: data?.keterangan,
            kode_tim: kode_tim,
            nama_jabatan_tim: data?.nama_jabatan,
            nama_pegawai: data?.nama_pegawai,
            nip: data?.nip
        }
    })

    const [Proses, setProses] = useState<boolean>(false);
    const { toastError, toastSuccess } = useToast();

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        // const FormData = {
        //     nama_jabatan_tim: data.nama_jabatan_tim,
        //     nip: data.nip,
        //     kode_tim: kode_tim,
        //     keterangan: data.keterangan,
        //     is_active: true,
        // }
        // console.log(FormData);
        const formData = new FormData();

        formData.append("is_active", "true");
        formData.append("keterangan", data.keterangan);
        formData.append("kode_tim", kode_tim);
        formData.append("nama_pegawai", data?.nama_pegawai);
        formData.append("nama_jabatan_tim", data.nama_jabatan_tim);
        formData.append("nip", data?.nip);

        await apiFetch("/api/v1/timkerja/susunantim", {
            method: "POST",
            body: formData
        })
            .then(resp => {
                if(resp === 200 || resp === 201){
                    toastSuccess("data berhasil disimpan");
                } else {
                    AlertNotification("GAGAL", `${resp}`, "error", 3000, true);
                }
            })
            .catch(err => {
                AlertNotification("GAGAL", `${err}`, "error", 3000, true);
            })
    }

    const OptionPegawai = [
        { value: "1", label: "Pegawai 1" },
        { value: "2", label: "Pegawai 2" },
        { value: "3", label: "Pegawai 3" },
        { value: "4", label: "Pegawai 4" }
    ]

    const handleClose = () => {
        onClose();
        reset();
    }

    return (
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <div className="w-max-[500px] mb-2 border-b border-blue-500 text-blue-500">
                <h1 className="flex items-center justify-center gap-1 text-xl uppercase font-semibold pb-1">
                    <TbUsersGroup />
                    {jenis === "baru" ? "Tambah" : "Edit"} Anggota Tim
                </h1>
            </div>
            <form className="flex flex-col mx-5 py-5 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="nama_pegawai"
                    control={control}
                    rules={{ required: "Nama Pegawai wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="nama_pegawai"
                                label="Nama Pegawai"
                            />
                            {errors.nama_pegawai &&
                                <p className="text-red-400 italic">{errors.nama_pegawai.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="nama_jabatan_tim"
                    control={control}
                    rules={{ required: "jabatan dalam tim wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="nama_jabatan_tim"
                                label="Jabatan Dalam Tim"
                            />
                            {errors.nama_jabatan_tim &&
                                <p className="text-red-400 italic">{errors.nama_jabatan_tim.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="nip"
                    control={control}
                    rules={{ required: "Nip wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="nip"
                                label="Nip"
                            />
                            {errors.nip &&
                                <p className="text-red-400 italic">{errors.nip.message}</p>
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