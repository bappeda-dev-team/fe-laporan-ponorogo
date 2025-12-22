'use client'

import { useBrandingContext } from "@/provider/BrandingProvider";

interface PerencanaanAsnLayoutProps {
    children: React.ReactNode;
}

export default function TppKonkerLayout({
    children
}: PerencanaanAsnLayoutProps) {

    const { loadingBranding } = useBrandingContext();

    if (loadingBranding) {
        return <>loading branding...</>;
    } else {
        return <>{children}</>
    }
}