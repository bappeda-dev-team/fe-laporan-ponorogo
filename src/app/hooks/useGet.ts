"use client";

import { useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: boolean;
    message: string;
}

export function useGet<T = unknown>(url: string, fetchTrigger: boolean) {
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
                    },
                });
                const result = await response.json();
                if (response.status != 200) {
                    setState({ data: null, loading: false, error: true, message: result.data });
                    console.log(result.data);
                    return;
                } else {
                    setState({ data: result.data, loading: false, error: false, message: 'success fetch data' });
                    return;
                }
            } catch (err) {
                console.log(err);
                setState({ data: null, loading: false, error: true, message: "Error, cek koneksi internet, terdapat kesalahan server/backend, jika berlanjut hubungi tim developer" });
            }
        }

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, fetchTrigger]);

    return state;
}
