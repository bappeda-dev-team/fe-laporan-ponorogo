'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { FloatingLabelTextarea } from "@/components/global/input";
import { useBrandingContext } from "@/provider/BrandingProvider";
import { AlertNotification } from "@/components/global/sweetalert2";
import { apiFetch } from "@/lib/apiFetch";
import { FormValue } from "../type";

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

export const FormFaktor: React.FC<FormFaktor> = ({ faktor, jenis, onClose }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            faktor_penghambat: faktor,
        }
    });
    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<string | null>(null);
    const {branding} = useBrandingContext();

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const payloadPenghambat = {
            bukti_dukung: "",
            bulan: branding?.bulan?.value,
            faktor_pendorong: "",
            faktor_penghambat: data.faktor_penghambat,
            id_rencana_kinerja: "",
            kode_opd: "",
            kode_subkegiatan: "",
            kode_tim: "",
            realisasi_anggaran: 0,
            rekomendasi_tl: "",
            rencana_aksi: "",
            tahun: String(branding?.tahun?.value)
        }
        const payloadPendorong = {
            bukti_dukung: "",
            bulan: branding?.bulan?.value,
            faktor_pendorong: data.faktor_pendorong,
            faktor_penghambat: "",
            id_rencana_kinerja: "",
            kode_opd: "",
            kode_subkegiatan: "",
            kode_tim: "",
            realisasi_anggaran: 0,
            rekomendasi_tl: "",
            rencana_aksi: "",
            tahun: String(branding?.tahun?.value)
        }
        // console.log(payload);
        try {
            setProses(true);
            await apiFetch(`/timkerja/realisasianggaran`, {
                method: "POST",
                body: jenis === "pendorong" ? payloadPendorong as any : payloadPenghambat
            }).then(_ => {
                toastSuccess("data berhasil disimpan");
                setEdited(true);
                setHasilEdit(jenis == "pendorong" ? data.faktor_pendorong : data.faktor_penghambat);
                // AlertNotification("Berhasil", "Berhasil Menambahkan Tim", "success", 3000, true);
                handleClose();
            }).catch(err => {
                AlertNotification("Gagal", `${err}`, "error", 3000, true);
            })
        } catch (err) {
            console.log(err);
            AlertNotification("Gagal", `${err}`, "error", 3000, true);
        } finally {
            setProses(false);
        }
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    if (Edited) {
        return (
            <Faktor faktor={HasilEdit || ""} jenis={jenis} />
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={jenis === "pendorong" ? "faktor_pendorong" : "faktor_penghambat"}
                        // rules={{ required: "tidak boleh kosong" }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <FloatingLabelTextarea
                                    {...field}
                                    id={jenis === "pendorong" ? "faktor_pendorong" : "faktor_penghambat"}
                                    label={`${jenis === "pendorong" ? "faktor pendorong" : "faktor penghambat"}`}
                                />
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