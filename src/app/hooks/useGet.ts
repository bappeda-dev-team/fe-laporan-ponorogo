"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useToast from "@/components/global/toast";

type FetchState<T> = {
    data: T | null
    loading: boolean
    error: boolean
    message: string
}

export function useGet<T = unknown>(url: string, fetchTrigger?: boolean) {
    const { toastError } = useToast()
    const router = useRouter()

    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: false,
        message: "",
    })

    useEffect(() => {
        const controller = new AbortController()

        async function fetchData() {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal: controller.signal,
                })

                if (response.status === 200) {
                    const result = await response.json()
                    setState({
                        data: result.data,
                        loading: false,
                        error: false,
                        message: "success fetch data",
                    })
                    return
                }

                if (response.status === 401) {
                    // 🔑 INVALID SESSION → LOGOUT
                    await fetch("/auth/logout", {
                        method: "POST",
                        credentials: "include",
                    })

                    toastError("Sesi berakhir, silakan login ulang")

                    setState({
                        data: null,
                        loading: false,
                        error: true,
                        message: "Unauthorized",
                    })

                    router.replace("/login")
                    return
                }

                // other errors
                const text = await response.text()
                toastError("Error Server")

                setState({
                    data: null,
                    loading: false,
                    error: true,
                    message: text,
                })
            } catch (err: any) {
                if (err.name === "AbortError") return

                console.error(err)
                toastError("Terjadi kesalahan server")

                setState({
                    data: null,
                    loading: false,
                    error: true,
                    message:
                        "Error, cek koneksi internet atau hubungi tim developer jika berlanjut",
                })
            }
        }

        fetchData()

        return () => controller.abort()
    }, [url, fetchTrigger, router, toastError])

    return state
}
