'use client'

import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { useState } from "react";
import "../globals.css";
import { Header } from "@/components/global/header";
import ToastProvider from "@/components/global/toastProvider";
import { Sidebar } from "@/components/global/sidebar";
import { usePathname } from "next/navigation";

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

    const [Show, setShow] = useState<boolean>(true);

    const pathname = usePathname();
    const loginPage = pathname === "/login"
    
    return (
        <>
            <NextTopLoader color="orange" />
            <Header />
            <div className="pt-20 px-5 pb-5 flex max-w-full overflow-hidden">
                {!loginPage &&
                    <Sidebar 
                        onShow={() => setShow((prev) => !prev)}
                        show={Show}
                    />
                }
                <div className={`${loginPage ? "" : Show ? "pl-[250px]" : "pl-[80px]"} flex-1 h-full overflow-y-auto`}>
                    {children}
                </div>
            </div>
            <ToastProvider />
        </>
    );
}
