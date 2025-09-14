'use client'

import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";
import { Header } from "@/components/global/header";

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    display: 'swap', // Mengatur tampilan swap agar tidak ada flash saat font dimuat
});


export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NextTopLoader color="orange"/>
            <div className="pt-[90px] px-5 pb-5">
                <Header />
                {children}
            </div>
        </>
    );
}
