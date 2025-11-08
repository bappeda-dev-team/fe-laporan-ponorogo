'use client'

import { ButtonBlackBorder, ButtonRedBorder } from "../button/button"
import Link from "next/link"
import Image from "next/image";
import {
    TbCircleFilled, TbUsersGroup, TbFileSettings,
    TbDeviceAnalytics, TbDeviceImacDollar, TbLogout,
    TbArrowBarLeft, TbArrowBarRight, TbSettings
} from "react-icons/tb";
import { usePathname } from "next/navigation";
import useToast from "./toast";

interface Sidebar {
    onShow: () => void;
    show: boolean;
}

export const Sidebar: React.FC<Sidebar> = ({ onShow, show }) => {
    const url = usePathname();
    const logo = process.env.NEXT_PUBLIC_LOGO_URL || "";
    const app = process.env.NEXT_PUBLIC_NAMA_APLIKASI || "";
    const { toastSuccess } = useToast();

    const getActiveClass = (isActive: boolean, type = 'default') => {
        const activeClasses = "text-white bg-sky-500";
        let defaultClasses = "hover:text-white text-sky-500 hover:bg-sky-700";

        if (type === 'default') {
            defaultClasses += " border border-sky-500";
        } else if (type === 'dropdown') {
            defaultClasses += " border border-sky-300";
        }

        return isActive ? activeClasses : defaultClasses;
    };

    return (
        <div
            className={`
                fixed my-20 ml-3 left-0 top-0 bottom-0 
                overflow-y-auto rounded-lg p-3
                shadow-lg shadow-gray-400 border border-sky-300 bg-white
                ${show ? "w-[250px]" : "w-[80px]"}
            `}
        >
            <ButtonBlackBorder
                className="w-full flex gap-1 mb-3"
                onClick={onShow}
            >
                {show ?
                    <>
                        <TbArrowBarLeft />
                        Sembunyikan
                    </>
                    :
                    <TbArrowBarRight />
                }
            </ButtonBlackBorder>
            <div className="flex flex-wrap items-center gap-2 justify-center mb-4">
                <Image
                    src={logo || "/placeholder-logo.png"}
                    alt="logo"
                    width={40}
                    height={40}
                />
                {show &&
                    <h1 className="font-bold text-sky-600 uppercase border-b border-sky-600">{app}</h1>
                }
            </div>
            <ul className="flex flex-col gap-2">
                <Link
                    href='/datamaster'
                    className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                        url.startsWith('/datamaster'), 'default'
                    )}`}
                >
                    <TbSettings />
                    {show &&
                        <p>
                            Data Master
                        </p>
                    }
                </Link>
                {show &&
                    <p className="flex gap-1 items-center text-slate-300 font-light text-sm italic">
                        <TbCircleFilled size={10} className="text-slate-300" />
                        Menu Tim
                    </p>
                }
                <Link
                    href='/susunantim'
                    className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                        url.startsWith('/susunantim'), 'default'
                    )}`}
                >
                    <TbUsersGroup />
                    {show &&
                        <p>
                            Susunan Tim
                        </p>
                    }
                </Link>
                {show &&
                    <p className="flex gap-1 items-center text-slate-300 font-light text-sm italic">
                        <TbCircleFilled size={10} className="text-slate-300" />
                        Menu Laporan
                    </p>
                }
                <Link
                    href='/laporankinerjakonker'
                    className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                        url.startsWith('/laporankinerjakonker'), 'default'
                    )}`}
                >
                    <TbDeviceAnalytics />
                    {show &&
                        <p>
                            Kinerja Konker
                        </p>
                    }
                </Link>
                <Link
                    href='/laporankinerjasekretariat'
                    className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                        url.startsWith('/laporankinerjasekretariat'), 'default'
                    )}`}
                >
                    <TbDeviceAnalytics />
                    {show &&
                        <p>
                            Kinerja Sekretariat
                        </p>
                    }
                </Link>
                <Link
                    href='/penilaiankinerjatim'
                    className={`flex items-center gap-1 font-medium text-sm rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                        url.startsWith('/penilaiankinerjatim'), 'default'
                    )}`}
                >
                    <TbFileSettings size={18} />
                    {show &&
                        <p>
                            Penilaian Kinerja Tim
                        </p>
                    }
                </Link>
                <Link
                    href='/laporantpp'
                    className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                        url.startsWith('/laporantpp'), 'default'
                    )}`}
                >
                    <TbDeviceImacDollar />
                    {show &&
                        <p>
                            TPP Konker
                        </p>
                    }
                </Link>
            </ul>
            <div className="flex items-center gap-3 mt-5">
                <ButtonRedBorder
                    onClick={() => {
                        localStorage.removeItem("sessionId");
                        window.location.href = "/login";
                        toastSuccess("Berhasil Logout")
                    }}
                    className="w-full flex gap-1"
                >
                    <TbLogout />
                    {show &&
                        <p>Logout</p>
                    }
                </ButtonRedBorder>
            </div>
        </div>
    )
} 