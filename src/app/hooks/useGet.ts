"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSessionId } from "@/lib/auth";
import useToast from "@/components/global/toast";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: boolean;
    message: string;
}

export function useGet<T = unknown>(url: string, fetchTrigger?: number) {
    const { toastError } = useToast();

    const router = useRouter();
    const S = getSessionId();
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: false,
        error: false,
        message: "",
    });

    useEffect(() => {
        // guard fetchTrigger
        if (!fetchTrigger) return;

        console.log('fetch')

        const controller = new AbortController();

        // set agar loading saat ada fetch trigger
        setState((s) => ({ ...s, loading: true }));

        async function fetchData() {
            try {
                const response = await fetch(`${url}`, {
                    headers: {
                        "Content-Type": 'application/json',
                        "X-Session-Id": `${S}`,
                    },
                });
                if (response.status === 200) {
                    const result = await response.json();
                    setState({ data: result.data, loading: false, error: false, message: 'success fetch data' });
                    // console.log(result)
                    return;
                } else if (response.status === 401) {
                    setState({ data: null, loading: false, error: true, message: "Login Ulang" });
                    toastError("Silakan Login Ulang")
                    router.push('/login');
                    return;
                } else {
                    const result = await response.json();
                    toastError("Error Server")
                    setState({ data: null, loading: false, error: true, message: result.data });
                    return;
                }
            } catch (err) {
                console.log(err);
                toastError("Error Server")
                setState({ data: null, loading: false, error: true, message: "Error, cek koneksi internet, terdapat kesalahan server/backend, jika berlanjut hubungi tim developer" });
            }
        }

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, fetchTrigger, S, router, toastError]);

    return state;
}
