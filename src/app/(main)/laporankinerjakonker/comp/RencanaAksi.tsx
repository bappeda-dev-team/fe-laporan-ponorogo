'use client'

import useToast from "@/components/global/toast";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ButtonRedBorder, ButtonGreenBorder } from "@/components/button/button";
import { useState, useEffect } from "react";
import { TbPencil, TbDeviceFloppy, TbX } from "react-icons/tb";
import { formatRupiah } from "@/app/hooks/formatRupiah";
import { FloatingLabelTextarea } from "@/components/global/input";
import { useBrandingContext } from "@/provider/BrandingProvider";
import { apiFetch } from "@/lib/apiFetch";
import { AlertNotification } from "@/components/global/sweetalert2";
import { FormValue } from "../type";

interface RencanaAksi {
    renaksi: string;
    Data?: any;
    kode_tim: string;
    id_program?: number;
}

export const RencanaAksi: React.FC<RencanaAksi> = ({ renaksi, kode_tim, id_program, Data }) => {

    const [Editing, setEditing] = useState<boolean>(false);

    if (Editing) {
        return (
            <FormRencanaAksi
                renaksi={renaksi}
                onClose={() => setEditing(false)}
                Data={Data}
                kode_tim={kode_tim}
                id_program={id_program || 0}
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
    Data?: any;
    kode_tim: string;
    id_program?: number;
}

export const FormRencanaAksi: React.FC<FormRencanaAksi> = ({ renaksi, onClose, Data, kode_tim, id_program }) => {

    const { toastSuccess } = useToast();
    const [Edited, setEdited] = useState<boolean>(false);
    const [Proses, setProses] = useState<boolean>(false);
    const [HasilEdit, setHasilEdit] = useState<string | null>(null);
    const {branding} = useBrandingContext();
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
            risiko_hukum: Data?.risiko_hukum,
            rencana_aksi: renaksi,
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
            realisasi_anggaran: Number(Data?.realisasi_anggaran),
            rekomendasi_tl: Data?.rekomendasi_tl || "",
            risiko_hukum: Data?.risiko_hukum,
            rencana_aksi: data.rencana_aksi,
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
                setHasilEdit(data.rencana_aksi);
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
            <RencanaAksi renaksi={HasilEdit || ""} kode_tim={kode_tim} />
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