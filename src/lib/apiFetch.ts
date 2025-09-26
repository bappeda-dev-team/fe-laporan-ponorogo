export async function apiFetch<T>(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<T> {
  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("sessionId")
      : null

  const headers = new Headers(init.headers || {})

  // hanya set Content-Type kalau body JSON
  // penting, jika tidak mau cors
  if (
    init.body &&
    typeof init.body === "object" &&
    !(init.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json")
    if (typeof init.body !== "string") {
      init.body = JSON.stringify(init.body)
    }
  }

  if (sessionId) {
    headers.set("X-Session-Id", sessionId)
  }

  const res = await fetch(input, { ...init, headers })

  if (!res.ok) {
    // coba parse pesan error dari server
    let errorMessage = `API error: ${res.status}`
    try {
      const errData = await res.json()
      if (errData?.message) {
        errorMessage = errData.message
      }
    } catch {
      // fallback ke default errorMessage
    }

    if (res.status === 401 || res.status === 403) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("sessionId")
        window.location.href = "/login"
      }
    }

    throw new Error(errorMessage)
  }

  return res.json()
}
