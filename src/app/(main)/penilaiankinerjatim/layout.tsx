'use client'

import { useBrandingContext } from "@/provider/BrandingProvider";
import { IsLoadingBranding } from "@/components/global/Loading";

interface PerencanaanAsnLayoutProps {
    children: React.ReactNode;
}

export default function PenliaianTimKerjaLayout({
    children
}: PerencanaanAsnLayoutProps) {

    const { loadingBranding } = useBrandingContext();

    if (loadingBranding) {
        return <IsLoadingBranding />
    } else {
        return (
            <>{children}</>
        )
    }
}