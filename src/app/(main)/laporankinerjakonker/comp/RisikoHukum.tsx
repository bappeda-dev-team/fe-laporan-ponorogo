'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { FloatingLabelTextarea } from "@/components/global/input";
import { FormValue } from "../type";
import { apiFetch } from "@/lib/apiFetch";
import { AlertNotification } from "@/components/global/sweetalert2";
import { useBrandingContext } from "@/provider/BrandingProvider";

interface RisikoHukum {
    risiko_hukum: string;
    Data?: any;
    kode_tim: string;
    id_program?: number;
}

export const RisikoHukum: React.FC<RisikoHukum> = ({ risiko_hukum, Data, kode_tim, id_program }) => {

    const [Editing, setEditing] = useState<boolean>(false);

    if (Editing) {
        return (
            <FormRekomendasi
                risiko_hukum={risiko_hukum}
                onClose={() => setEditing(false)}
                Data={Data}
                kode_tim={kode_tim}
                id_program={id_program || 0}
            />
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                {risiko_hukum || ""}
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
    risiko_hukum: string;
    onClose: () => void;
    Data?: any;
    kode_tim: string;
    id_program?: number;
}

export const FormRekomendasi: React.FC<FormRekomendasi> = ({ risiko_hukum, onClose, Data, kode_tim, id_program }) => {

    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<string | null>(null);
    const { branding } = useBrandingContext();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            bukti_dukung: "",
            bulan: branding?.bulan?.value,
            faktor_pendorong: Data?.faktor_pendorong || "",
            faktor_penghambat: Data?.faktor_penghambat || "",
            id_program_unggulan: id_program || 0,
            id_pohon: Data?.id_pohon,
            id_rencana_kinerja: Data?.id_pohon || "",
            kode_opd: branding?.opd,
            kode_subkegiatan: "",
            kode_tim: kode_tim,
            realisasi_anggaran: Data?.realisasi_anggaran,
            rekomendasi_tl: Data?.rekomendasi_tl || "",
            risiko_hukum: risiko_hukum,
            rencana_aksi: Data?.rencana_aksi,
            tahun: String(branding?.tahun?.value)
        }
    });

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const payload = {
            bukti_dukung: "",
            bulan: branding?.bulan?.value,
            faktor_pendorong: Data?.faktor_pendorong || "",
            faktor_penghambat: Data?.faktor_penghambat || "",
            id_program_unggulan: id_program || 0,
            id_pohon: Data?.id_pohon,
            id_rencana_kinerja: String(Data?.id_pohon || ""),
            kode_opd: branding?.opd,
            kode_subkegiatan: "",
            kode_tim: kode_tim,
            realisasi_anggaran: Data?.realisasi_anggaran,
            rekomendasi_tl: Data?.rekomendasi_tl || "",
            risiko_hukum: data.risiko_hukum,
            rencana_aksi: Data?.rencana_aksi,
            tahun: String(branding?.tahun?.value)
        }
        console.log(payload);
        try {
            setProses(true);
            await apiFetch(`/api/v1/timkerja/realisasianggaran`, {
                method: "POST",
                body: payload as any
            }).then(_ => {
                toastSuccess("data berhasil disimpan");
                setEdited(true);
                setHasilEdit(data.risiko_hukum);
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
            <RisikoHukum risiko_hukum={HasilEdit || ""} kode_tim={kode_tim} id_program={id_program}/>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="risiko_hukum"
                        rules={{ required: "tidak boleh kosong" }}
                        control={control}
                        render={({ field }) => (
                            <>
                                <FloatingLabelTextarea
                                    {...field}
                                    id="risiko_hukum"
                                    label="Risiko Hukum"
                                />
                                {errors.risiko_hukum &&
                                    <p className="text-xs italic text-red-500">{errors.rekomendasi_tl?.message}</p>
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