'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup, TbDeviceFloppy, TbX } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelInput, FloatingLabelSelect } from "@/components/global/input";
import { ButtonSky, ButtonRed } from "@/components/button/button";
import { OptionTypeString, OpdGetResponse, ApiResp } from "@/types";
import { apiFetch } from "@/lib/apiFetch";
import { AnggotaGetResponse } from "@/types/tim";
import { AlertNotification } from "@/components/global/sweetalert2";
import useToast from "@/components/global/toast";
import { useGet } from "@/app/hooks/useGet";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    jenis: "baru" | "edit" | "";
    kode_tim: string;
    data?: AnggotaGetResponse | null;
}
interface FormValue {
    kode_opd: OptionTypeString | null;
    is_active: boolean;
    keterangan: string;
    kode_tim: string;
    nama_jabatan_tim: string;
    nama_pegawai: string;
    nip: OptionTypeString | null;
}

export const ModalAnggota: React.FC<Modal> = ({ isOpen, onClose, onSuccess, jenis, kode_tim, data }) => {

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            is_active: data?.is_active || true,
            keterangan: data?.keterangan || "",
            kode_tim: kode_tim || "",
            nama_jabatan_tim: data?.nama_jabatan || "",
            nama_pegawai: data?.nama_pegawai || "",
            nip: data?.nip ? {
                value: data.nip,
                label: data.nama_pegawai || '',
            } : null,
        }
    })

    const [Proses, setProses] = useState<boolean>(false);
    const { toastSuccess } = useToast();

    const [OpdOption, setOpdOption] = useState<OptionTypeString[]>([]);
    const [OptionPegawai, setOptionPegawai] = useState<OptionTypeString[]>([]);
    const [Opd, setOpd] = useState<OptionTypeString | null>(null);
    const [Loading, setLoading] = useState<boolean>(true);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
      // backend tidak terima formdata
        const payload = {
          is_active: true,
          keterangan: data.keterangan,
          kode_tim: kode_tim,
          nama_pegawai: data?.nip?.label,
          nip: data?.nip?.value,
          nama_jabatan_tim: data.nama_jabatan_tim
        }

        await apiFetch("/api/v1/timkerja/susunantim", {
            method: "POST",
            body: payload as any
        })
            .then(resp => {
                if (resp === 200 || resp === 201) {
                    toastSuccess("data berhasil disimpan");
                } else {
                    AlertNotification("GAGAL", `${resp}`, "error", 3000, true);
                }
            })
            .catch(err => {
                AlertNotification("GAGAL", `${err}`, "error", 3000, true);
            })
    }

    const { data: dataOpd, loading: loadingOpd, error, message } = useGet<OpdGetResponse[]>("/api/v1/laporan/api/external/opdlist")

    useEffect(() => {
        if (dataOpd) {
            const listOpd = dataOpd.map((item: OpdGetResponse) => ({
                value: item.kode_opd,
                label: item.nama_opd,
            }));
            setOpdOption(listOpd);
            setLoading(loadingOpd);
            // console.log(dataOpd);
        }
        if (Opd) {
            apiFetch(`/api/v1/perencanaan/pegawai/findall?kode_opd=${Opd?.value}`)
                .then((resp: any) => {
                    if (resp.code === 200) {
                        const DataPegawai = resp.data.map((p: any) => ({
                            value: p.nip,
                            label: p.nama_pegawai,
                        }))
                        setOptionPegawai(DataPegawai);
                    } else {
                        AlertNotification("GAGAL", `${resp.data}`, "error", 3000, true);
                    }
                })
                .catch(err => {
                    AlertNotification("GAGAL", `gagal mendapatkan data pegawai`, "error", 3000, true);
                    console.log(err);
                })
        }
    }, [dataOpd, Opd, loadingOpd]);

    const handleClose = () => {
        onClose();
        setOpd(null);
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
                <FloatingLabelSelect
                    id="kode_opd"
                    label="Pilih OPD untuk Pilih Pegawai"
                    options={OpdOption}
                    isClearable
                    value={Opd}
                    isSearchable
                    onChange={(option) => {
                        setOpd(option as OptionTypeString);
                        // console.log(option);
                    }}
                    isLoading={Loading}
                />
                {!Opd ?
                    <h1 className="flex justify-center border rounded-lg p-1 bg-gray-500 text-white">pilih opd terlebih dahulu</h1>
                    :
                    <>
                        <Controller
                            name="nip"
                            control={control}
                            rules={{ required: "Nama Pegawai wajib terisi" }}
                            render={({ field }) => (
                                <>
                                    <FloatingLabelSelect
                                        {...field}
                                        id="nip"
                                        options={OptionPegawai}
                                        label="Nama Pegawai"
                                    />
                                    {errors.nip &&
                                        <p className="text-red-400 italic">{errors.nip.message}</p>
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
                    </>
                }
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
