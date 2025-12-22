'use client'

import { ModalComponent } from "@/components/page/ModalComponent";
import { TbUsersGroup } from "react-icons/tb";
import { useBrandingContext } from "@/provider/BrandingProvider";

interface Modal {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalUserInfo: React.FC<Modal> = ({ isOpen, onClose }) => {

    const { branding } = useBrandingContext();

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-max-[500px] mb-2 border-b border-blue-500 text-blue-500">
                <h1 className="flex items-center justify-center gap-1 text-xl uppercase font-semibold pb-1">
                    <TbUsersGroup />
                    Informasi User
                </h1>
            </div>
            <table className="w-full">
                <tbody>
                    <tr className="border">
                        <td>Username</td>
                        <td>:</td>
                        <td>{branding?.user?.username ?? "username kosong"}</td>
                    </tr>
                    <tr className="border">
                        <td>NIP</td>
                        <td>:</td>
                        <td>{branding?.user?.nip ?? "nip kosong"}</td>
                    </tr>
                </tbody>
            </table>
        </ModalComponent>
    )
}