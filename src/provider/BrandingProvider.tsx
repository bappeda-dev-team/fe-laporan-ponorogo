'use client'

import { createContext, useContext } from "react"
import { getCookies } from "@/lib/cookies";
import { useState, useEffect } from "react";
import { OptionType, OptionTypeString } from "../types";
import { AlertNotification } from "@/components/global/sweetalert2";

interface BrandingContextType {
    loadingBranding: boolean;
    branding: {
        nama_app: string;
        nama_pemda: string;
        logo: string;
        api_url: string;
        tahun: OptionType | null | undefined;
        bulan: OptionType | null | undefined;
        opd: string;
        user: UserInfo | null | undefined;
    }
}

interface UserInfo {
    username: string;
    firstName: string;
    kode_opd: string;
    nip: string;
    roles: string[];
}

const appName = process.env.NEXT_PUBLIC_NAMA_APLIKASI || "";
const clientName = process.env.NEXT_PUBLIC_NAMA_PEMDA || "";
const logo = process.env.NEXT_PUBLIC_LOGO_URL || "";
const api_url = process.env.NEXT_PUBLIC_API_URL || "";
const opd = process.env.NEXT_PUBLIC_KODE_OPD || "";

// context
const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export function BrandingProvider({ children }: Readonly<{ children: React.ReactNode; }>) {

    const [Tahun, setTahun] = useState<OptionType | null>(null);
    const [Bulan, setBulan] = useState<OptionType | null>(null);
    const [User, setUser] = useState<UserInfo | null>(null);

    const [Loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const get_tahun = getCookies("tahun");
        const get_bulan = getCookies("bulan");
        const SessionId = localStorage.getItem("sessionId");
        const FetchUser = async () => {
            const response = await fetch(`${api_url}/user-info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-Id': `${SessionId}`
                },
            });
            if(response.ok){
                const result = await response.json();
                // console.log("User Info: ", result);
                setUser(result);
            } else {
                AlertNotification("User Failed", "tidak bisa mengambil data user, cek koneksi internet, jika berlanjut hubungi tim developer", "error", 3000, true);
                setUser(null);
            }
        }
        FetchUser();
        if (get_tahun) {
            const tahun = JSON.parse(get_tahun);
            if (tahun === null || tahun === undefined) {
                setTahun(null);
            } else {
                const valueTahun = {
                    value: tahun.value,
                    label: tahun.label
                }
                setTahun(valueTahun);
            }
        }
        if (get_bulan) {
            const jenis = JSON.parse(get_bulan);
            if (jenis === null || jenis === undefined) {
                setBulan(null);
            } else {
                const valueBulan = {
                    value: jenis.value || null,
                    label: jenis.label || null
                }
                setBulan(valueBulan);
            }
        }
        setLoading(false);
    }, []);

    return (
        <BrandingContext.Provider
            value={{
                loadingBranding: Loading,
                branding: {
                    nama_app: appName,
                    nama_pemda: clientName,
                    logo: logo,
                    api_url: api_url,
                    tahun: Tahun,
                    bulan: Bulan,
                    opd: opd,
                    user: User,
                }
            }}
        >
            {children}
        </BrandingContext.Provider>
    );
}

export function useBrandingContext() {
    const context = useContext(BrandingContext);
    if (context === undefined) {
        throw new Error("useBrandingContext must be used witihin a BrandingProvider")
    }
    return context;
}
