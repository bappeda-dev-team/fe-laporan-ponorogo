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


  // // optional (frontend only)
  const data: LoginResponse = await res.json();
  localStorage.setItem("timkerja-sessionId", data.sessionId);
  // SET COOKIE DARI BACKEND SAJA
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId
      },
    });
  }

  // bersihkan client state
  localStorage.removeItem("timkerja-sessionId");

  // // HAPUS COOKIE YANG BENAR
  document.cookie =
    `sessionId=; path=/; max-age=0; SameSite=Lax`;

  window.location.href = "/login";
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
