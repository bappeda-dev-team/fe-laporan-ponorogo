'use client'

type LoginResponse = {
    sessionId: string;
}

export async function login(username: string, password: string): Promise<void> {
    const API_LOGIN = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_LOGIN}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // penting kalau backend set cookie
    });

    if (!res.ok) {
        throw new Error("Login gagal");
    }

    const data: LoginResponse = await res.json();

    // optional (frontend only)
    localStorage.setItem("timkerja-sessionId", data.sessionId);

    // cookie untuk middleware
    document.cookie =
        `timkerja-sessionId=${data.sessionId}; path=/; SameSite=Lax`;

    // redirect SETELAH session tersimpan
    window.location.href = "/";
}

export function getSessionId(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("timkerja-sessionId")
}

export async function logout(): Promise<void> {
    const sessionId = localStorage.getItem("timkerja-sessionId");

    if (sessionId) {
        await fetch("/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Session-Id": sessionId
            },
        });
    }

    // bersihkan client state
    localStorage.removeItem("timkerja-sessionId");

    // HAPUS COOKIE YANG BENAR
    document.cookie =
        `timkerja-sessionId=; path=/; max-age=0; SameSite=Lax`;

    window.location.href = "/login";
}

