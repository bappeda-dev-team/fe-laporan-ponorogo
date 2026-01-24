'use client'

import { ChangeEvent, useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup, TbDeviceFloppy, TbX } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelInput, FloatingLabelSelect } from "@/components/global/input";
import { ButtonSky, ButtonRed } from "@/components/button/button";
import { apiFetch } from "@/lib/apiFetch";
import useToast from "@/components/global/toast";
import { AlertNotification } from "@/components/global/sweetalert2";
import { OptionType, OptionTypeString } from "@/types";
import { GetResponseFindallPegawai } from "../type";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "baru" | "edit" | "";
    Data?: GetResponseFindallPegawai | null;
}
interface FormValue {
    nip: string;
    namaPegawai: string;
    namaJabatan: string;
    kodeOpd: string;
    statusJabatan: OptionTypeString | null;
    jenisJabatan: OptionTypeString | null;
    eselon: OptionTypeString | null;
    pangkat: string;
    golongan: string;
    namaRole: string;
    basicTpp: number | null;
    pajak: OptionType | null;
    isActive: boolean;
    tanggalMulai: string;
    tanggalAkhir: string;
}

export const ModalJabatanPegawai: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, Data }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            namaPegawai: Data?.namaPegawai,
            nip: Data?.nip,
            namaJabatan: Data?.namaJabatan,
            kodeOpd: Data?.kodeOpd,
            statusJabatan: {
                value: Data?.statusJabatan,
                label: Data?.statusJabatan,
            },
            jenisJabatan: {
                value: Data?.jenisJabatan,
                label: Data?.jenisJabatan,
            },
            eselon: {
                value: Data?.eselon,
                label: Data?.eselon,
            },
            pangkat: Data?.pangkat,
            golongan: Data?.golongan,
            basicTpp: Data?.basicTpp ?? null,
            pajak: Data ? {
                value: Data.pajak,
                label: Data.pajak === 0.0 ? "0%" : `${Data.pajak * 100}%`,
            } : null,
            tanggalMulai: Data?.tanggalMulai ?? "",
            tanggalAkhir: Data?.tanggalAkhir ?? "",
        }
    })

    const [Proses, setProses] = useState<boolean>(false);
    const { toastSuccess } = useToast();
    const opd = process.env.NEXT_PUBLIC_KODE_OPD || "-";

    const StatusOption = [
        { value: "PLT_UTAMA", label: "PLT_UTAMA" },
        { value: "PLT_SEMENTARA", label: "PLT_SEMENTARA" },
        { value: "UTAMA", label: "UTAMA" },
        { value: "BERAKHIR", label: "BERAKHIR" },
    ];
    const EselonOption = [
        { value: "ESELON_I", label: "ESELON_I" },
        { value: "ESELON_II", label: "ESELON_II" },
        { value: "ESELON_III", label: "ESELON_III" },
        { value: "ESELON_IV", label: "ESELON_IV" },
        { value: "II_A", label: "II_A" },
        { value: "II_B", label: "II_B" },
        { value: "III_A", label: "III_A" },
        { value: "III_B", label: "III_B" },
        { value: "IV_A", label: "IV_A" },
        { value: "IV_B", label: "IV_B" },
        { value: "PELAKSANA", label: "PELAKSANA" },
        { value: "JF", label: "JF" },
        { value: "NON_ESELON", label: "NON_ESELON" },
        { value: "NON_STRUKTURAL_(A)", label: "NON_STRUKTURAL_(A)" },
    ];
    const JenisJabatanOption = [
        { value: "JABATAN_PEMIMPIN_TINGGI_PRATAMA", label: "JABATAN_PEMIMPIN_TINGGI_PRATAMA" },
        { value: "JABATAN_PEMIMPIN_TINGGI", label: "JABATAN_PEMIMPIN_TINGGI" },
        { value: "JABATAN_STRUKTURAL", label: "JABATAN_STRUKTURAL" },
        { value: "JABATAN_FUNGSIONAL", label: "JABATAN_FUNGSIONAL" },
        { value: "JABATAN_ADMINISTRASI", label: "JABATAN_ADMINISTRASI" },
        { value: "JABATAN_ADMINISTRATOR", label: "JABATAN_ADMINISTRATOR" },
        { value: "JABATAN_PENGAWAS", label: "JABATAN_PENGAWAS" },
        { value: "JABATAN_PENGAWAS", label: "JABATAN_PENGAWAS" },
        { value: "PELAKSANA", label: "PELAKSANA" },
        { value: "BELUM_DIATUR", label: "BELUM_DIATUR" },
    ];
    const pajakOption = [
      { value: 0.0, label: "0%" },
      { value: 0.05, label: "5%" },
      { value: 0.15, label: "15%" },
    ];

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        // backend tidak terima formdata
        const payload = {
            namaPegawai: data.namaPegawai,
            nip: data?.nip,
            namaJabatan: data?.namaJabatan,
            kodeOpd: opd,
            statusJabatan: data?.statusJabatan?.value,
            jenisJabatan: data?.jenisJabatan?.value,
            eselon: data?.eselon?.value,
            pangkat: data?.pangkat,
            golongan: data?.golongan,
            basicTpp: data?.basicTpp,
            pajak: data?.pajak?.value,
            tanggalMulai: data?.tanggalMulai,
            tanggalAkhir: data?.tanggalAkhir,
            // tanggalBerakhir: "01-01-2025"
        }
        // console.log(payload);
        try {
            setProses(true);
            await apiFetch(jenis === "baru" ? "/api/v1/tpp/jabatan/with-tpp-pajak" : `/api/v1/tpp/jabatan/update/with-tpp-pajak/${Data?.id}`, {
                method: jenis === "baru" ? "POST" : "PUT",
                body: payload as any
            }).then(_ => {
                toastSuccess("data berhasil disimpan");
                AlertNotification("Berhasil", "Berhasil Menyimpan Data Jabatan Pegawai", "success", 3000, true);
                onSuccess();
                handleClose();
            }).catch(err => {
                AlertNotification("Gagal", `${err}`, "error", 3000, true);
            })
        } catch (err) {
            AlertNotification("Gagal", `${err}`, "error", 3000, true);
            console.log(err)
        } finally {
            setProses(false);
        }
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    const formatNumberWithDots = (value: number | string | null) => {
        if (value === null || value === undefined || value === '') return '';
        // Hapus karakter non-digit yang mungkin sudah ada (termasuk titik atau spasi)
        const numberString = String(value).replace(/\D/g, '');
        if (numberString === '') return '';
        // Format dengan TITIK sebagai pemisah ribuan
        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Ganti ' ' menjadi '.'
    };
    const unformatNumber = (value: number | string) => {
        if (value === null || value === undefined || value === '') return null;
        // Hapus spasi, titik, dan karakter non-digit lainnya
        const numberString = String(value).replace(/\D/g, '');
        // Kembalikan null jika string kosong, atau angka jika valid
        return numberString === '' ? null : Number(numberString);
    };

    return (
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <div className="w-max-[500px] mb-2 border-b border-blue-500 text-blue-500">
                <h1 className="flex items-center justify-center gap-1 text-xl uppercase font-semibold pb-1">
                    <TbUsersGroup />
                    {jenis === "baru" ? "Tambah" : "Edit"} Jabatan Pegawai
                </h1>
            </div>
            <form className="flex flex-col mx-5 py-8 gap-2" onSubmit={handleSubmit(onSubmit)}>
                {jenis === "edit" &&
                    <h1 className="font-bold text-sky-500">Nama Pegawai : {Data?.namaPegawai || "tanpa nama"}</h1>
                }
                <Controller
                    name="namaPegawai"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="namaPegawai"
                                label="nama Pegawai"
                            />
                            {errors.namaPegawai &&
                                <p className="text-red-400 italic">{errors.namaPegawai.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="nip"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="nip"
                                label="NIP"
                            />
                            {errors.nip &&
                                <p className="text-red-400 italic">{errors.nip.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="namaJabatan"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="namaJabatan"
                                label="nama Jabatan"
                            />
                            {errors.namaJabatan &&
                                <p className="text-red-400 italic">{errors.namaJabatan.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="statusJabatan"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelSelect
                                {...field}
                                id="statusJabatan"
                                label="Status Jabatan"
                                options={StatusOption}
                            />
                            {errors.statusJabatan &&
                                <p className="text-red-400 italic">{errors.statusJabatan.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="eselon"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelSelect
                                {...field}
                                id="eselon"
                                label="Eselon"
                                options={EselonOption}
                            />
                            {errors.eselon &&
                                <p className="text-red-400 italic">{errors.eselon.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="jenisJabatan"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelSelect
                                {...field}
                                id="jenisJabatan"
                                label="Jenis Jabatan"
                                options={JenisJabatanOption}
                            />
                            {errors.jenisJabatan &&
                                <p className="text-red-400 italic">{errors.jenisJabatan.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="pangkat"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="pangkat"
                                label="Pangkat"
                                type="text"
                            />
                            {errors.pangkat &&
                                <p className="text-red-400 italic">{errors.pangkat.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="golongan"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelInput
                                {...field}
                                id="golongan"
                                label="Golongan"
                                type="text"
                            />
                            {errors.golongan &&
                                <p className="text-red-400 italic">{errors.golongan.message}</p>
                            }
                        </>
                    )}
                />
                <Controller
                    name="basicTpp"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => {
                        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
                            const inputValue = e.target.value;
                            const numericValue = unformatNumber(inputValue);
                            field.onChange(numericValue);
                        };
                        const displayValue = formatNumberWithDots(field.value ?? "");
                        return (
                            <>
                                <label htmlFor="basicTpp" className="text-sm text-slate-500">Basic TPP</label>
                                <input
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    className="border px-4 py-2 rounded-lg"
                                    id="basicTpp"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Masukkan Basic TPP"
                                    value={displayValue === null ? "" : displayValue}
                                    onChange={handleInputChange}
                                />
                                {errors.basicTpp &&
                                    <p className="text-red-400 italic">{errors.basicTpp.message}</p>
                                }
                            </>
                        )
                    }}
                />
                <Controller
                    name="pajak"
                    control={control}
                    rules={{ required: "wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelSelect
                                {...field}
                                id="pajak"
                                label="Pajak"
                                options={pajakOption}
                            />
                            {errors.pajak &&
                                <p className="text-red-400 italic">{errors.pajak.message}</p>
                            }
                        </>
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
