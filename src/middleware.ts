import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// daftar path yang butuh login
const protectedRoutes = ["/susunantim"]

export function middleware(req: NextRequest) {
    const sessionId = req.cookies.get("timkerja-sessionId")?.value

    // kalau user akses protected page tanpa session
    if (protectedRoutes.some((p) => req.nextUrl.pathname.startsWith(p))) {
        if (!sessionId) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }

    return NextResponse.next()
}
