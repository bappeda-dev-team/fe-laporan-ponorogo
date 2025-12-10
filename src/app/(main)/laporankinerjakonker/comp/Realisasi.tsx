'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { formatRupiah } from "@/app/hooks/formatRupiah";
import { FloatingLabelInput } from "@/components/global/input";
import { FormValue } from "../type";
import { useBrandingContext } from "@/provider/BrandingProvider";
import { apiFetch } from "@/lib/apiFetch";
import { AlertNotification } from "@/components/global/sweetalert2";

interface Realisasi {
    anggaran: number;
    Data?: any;
    kode_tim: string;
    id_program?: number;
}

export const Realisasi: React.FC<Realisasi> = ({ anggaran, Data, kode_tim, id_program }) => {

    const [Editing, setEditing] = useState<boolean>(false);

    if (Editing) {
        return (
            <FormRealisasi
                anggaran={anggaran}
                onClose={() => setEditing(false)}
                Data={Data}
                kode_tim={kode_tim}
                id_program={id_program || 0}
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
    Data: any;
    kode_tim: string;
    id_program: number;
}

export const FormRealisasi: React.FC<FormRealisasi> = ({ anggaran, onClose, Data, kode_tim, id_program }) => {

    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<number | null>(null);
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
            realisasi_anggaran: anggaran,
            rekomendasi_tl: Data?.rekomendasi_tl || "",
            rencana_aksi: Data?.rencana_aksi || "",
            tahun: String(branding?.tahun?.value)
        }
    });

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const payload = {
            bukti_dukung: "",
            bulan: branding?.bulan?.value,
            faktor_pendorong: Data?.faktor_pendorong,
            faktor_penghambat: Data?.faktor_penghambat,
            id_program_unggulan: id_program,
            id_pohon: Data?.id_pohon,
            id_rencana_kinerja: String(Data?.id_pohon),
            kode_opd: branding?.opd,
            kode_subkegiatan: "",
            kode_tim: kode_tim,
            realisasi_anggaran: Number(data.realisasi_anggaran),
            rekomendasi_tl: Data?.rekomendasi_tl,
            rencana_aksi: Data?.rencana_aksi,
            tahun: String(branding?.tahun?.value)
        }
        // console.log(payload);
        try {
            setProses(true);
            await apiFetch(`/api/v1/timkerja/realisasianggaran`, {
                method: "POST",
                body: payload as any
            }).then((resp: any) => {
                toastSuccess("data berhasil disimpan");
                setEdited(true);
                setHasilEdit(resp.data.realisasi_anggaran);
                // console.log(resp.data.realisasi_anggaran);
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
            <Realisasi anggaran={HasilEdit || 0} kode_tim={kode_tim} />
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