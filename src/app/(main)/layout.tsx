'use client'

import { useState } from "react";
import { Header } from "@/components/global/header";
import { Sidebar } from "@/components/global/sidebar";
import { usePathname } from "next/navigation";


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
        </>
    );
}
