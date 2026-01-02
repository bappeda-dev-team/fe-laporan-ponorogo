export async function apiFetch<T>(
    input: RequestInfo,
    init: RequestInit = {}
): Promise<T> {
    const sessionId =
        typeof window !== "undefined"
            ? localStorage.getItem("timkerja-sessionId")
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
    const responseText = await res.text()

    if (!res.ok) {
        // coba parse pesan error dari server
        let errorMessage = `API error: ${res.status}`
        if (responseText) {
            try {
                const errData = JSON.parse(responseText)
                if (errData?.message) {
                    errorMessage = errData.message
                }
            } catch {
                errorMessage = responseText
            }
        }

        if (res.status === 401 || res.status === 403) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("timkerja-sessionId")
                window.location.href = "/login"
            }
        }

        throw new Error(errorMessage)
    }

    if (!responseText) {
        return undefined as T
    }

    try {
        return JSON.parse(responseText)
    } catch {
        // fallback ke text jika server tidak mengirim JSON
        return responseText as unknown as T
    }
}
