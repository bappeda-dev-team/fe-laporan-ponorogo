'use client'

type LoginResponse = {
    sessionId: string;
}

export async function login(username: string, password: string): Promise<void> {
    const API_LOGIN = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_LOGIN}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })

    if (!res.ok) {
        throw new Error("Login gagal")
    }

    const data: LoginResponse = await res.json();
    localStorage.setItem("sessionId", data.sessionId)

    // cookie buat middleware
    document.cookie = `sessionId=${data.sessionId}; path=/; secure; samesite=strict`
}

export function getSessionId(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("sessionId")
}

export async function logout() {
    const sessionId = getSessionId();
    if (sessionId) {

        const res = await fetch("/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Session-Id": sessionId
            },
        })

        if (res.ok) {
            if (typeof window === "undefined") return null;
            localStorage.removeItem("sessionId")
            document.cookie = `sessionId=; path=/; max-age=0; secure; samesite=strict`
            window.location.href = "/login"
        }
    }
}

// refresh session
// sessionId tetap
export async function refresh(sessionId: string): Promise<void> {
    const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Session-Id": sessionId
        },
    })

    if (!res.ok) {
        throw new Error("harap login lagi")
    }
}
