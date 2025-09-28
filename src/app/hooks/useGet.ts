"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSessionId } from "@/lib/auth";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: boolean;
    message: string;
}

export function useGet<T = unknown>(url: string, fetchTrigger: boolean) {

    const router = useRouter();
    const S = getSessionId();
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: false,
        message: "",
    });

    useEffect(() => {
        const controller = new AbortController();
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        async function fetchData() {
            try {
                const response = await fetch(`${API_URL}/${url}`, {
                    headers: {
                        "Content-Type": 'application/json',
                        "X-Session-Id": `${S}`,
                    },
                });
                const result = await response.json();
                if (response.status == 200) {
                    setState({ data: result.data, loading: false, error: false, message: 'success fetch data' });
                    console.log(result.data)
                    return;
                } else if(response.status == 401) {
                    setState({ data: null, loading: false, error: false, message: result.data });
                    router.push('/login');
                    return;
                } else {
                    setState({ data: null, loading: false, error: true, message: result.data });
                    console.log(result.data);
                    return;
                }
            } catch (err) {
                console.log(err);
                setState({ data: null, loading: false, error: true, message: "Error, cek koneksi internet, terdapat kesalahan server/backend, jika berlanjut hubungi tim developer" });
            } finally {
                console.log(S);
            }
        }

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, fetchTrigger]);

    return state;
}
