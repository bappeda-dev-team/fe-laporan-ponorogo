'use client'

import { useBrandingContext } from "@/provider/BrandingProvider";

interface PerencanaanAsnLayout {
    children: React.ReactNode;
}

export default function KonkerLayout({
    children
}: PerencanaanAsnLayout) {

    const {loadingBranding, branding} = useBrandingContext()
    
    if(loadingBranding){
        return <>loading branding</>
    } else {
        if(branding?.bulan === undefined || branding?.tahun?.value === undefined){
            return <>pilih bulan dan tahun terlebih dahulu</>
        } else {
            return<>{children}</>
        }
    }
}