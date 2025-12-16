'use client'

type LoginResponse = {
    sessionId: string;
}

export async function login(username: string, password: string): Promise<void> {

    const res = await fetch(`/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })

    if (!res.ok) {
        throw new Error("Login gagal")
    }
    // SET COOKIE DARI BACKEND SAJA
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
            credentials: "include",
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
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-Session-Id": sessionId
        },
    })

    if (!res.ok) {
        throw new Error("harap login lagi")
    }
}
