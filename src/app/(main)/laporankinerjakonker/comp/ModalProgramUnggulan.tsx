'use client'

import { useEffect, useState } from "react";
import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup, TbDeviceFloppy, TbX } from "react-icons/tb";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FloatingLabelSelect } from "@/components/global/input";
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
    id_program_unggulan: OptionType | null;
    tahun: string;
    kode_opd: string;
}

export const ModalProgramUnggulan: React.FC<Modal> = ({ isOpen, onClose, onSuccess, Data }) => {

    const opd = process.env.NEXT_PUBLIC_KODE_OPD;

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValue>({
        defaultValues: {
            id_program_unggulan: null,
            tahun: "2025",
            kode_opd: opd,
        }
    });

    const [OptionProgram, setOptionProgram] = useState<OptionType[]>([]);

    const [Proses, setProses] = useState<boolean>(false);
    const { toastError, toastSuccess } = useToast();

    const { data, error, loading } = useGet<ProgramUnggulanGetResponse[]>(`/api/v1/perencanaan/program_unggulan/findall/2025/2030`)

    useEffect(() => {
        if (data) {
            const programUnggulan = data.map((p: ProgramUnggulanGetResponse) => ({
                value: p.id,
                label: `${p.nama_program_unggulan || "-"} - ${p.rencana_implementasi || "-"}`,
            }));
            setOptionProgram(programUnggulan);
        }
    }, [data]);

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        // backend tidak terima formdata
        const payload = {
            id_program_unggulan: data.id_program_unggulan?.value,
            tahun: "2025",
            kode_opd: opd
        }

        // console.log(payload);

        await apiFetch(`/api/v1/timkerja/timkerja/${Data?.kode_tim}/program_unggulan`, {
            method: "POST",
            body: payload as any
        }).then(_ => {
            toastSuccess("data berhasil disimpan");
            onSuccess();
            handleClose();
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
                    Tambah Program Unggulan
                </h1>
            </div>
            <form className="flex flex-col mx-5 py-5 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="id_program_unggulan"
                    control={control}
                    rules={{ required: "nama tim wajib terisi" }}
                    render={({ field }) => (
                        <>
                            <FloatingLabelSelect
                                {...field}
                                id="id_program_unggulan"
                                label="Program Unggulan"
                                options={OptionProgram}
                                isLoading={loading}
                            />
                            {errors.id_program_unggulan &&
                                <p className="text-red-400 italic">{errors.id_program_unggulan.message}</p>
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
