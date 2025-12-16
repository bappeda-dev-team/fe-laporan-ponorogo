import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const LOGIN_PATH = "/login"

export function middleware(req: NextRequest) {
    const sessionId = req.cookies.get("sessionId")?.value
    const { pathname } = req.nextUrl

    const isLoginPage = pathname === LOGIN_PATH
    const isAuthenticated = Boolean(sessionId)

    // sudah login tapi buka /login
    if (isLoginPage && isAuthenticated) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    // belum login tapi buka halaman lain
    if (!isAuthenticated && !isLoginPage) {
        return NextResponse.redirect(new URL(LOGIN_PATH, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api|auth).*)",
    ],
}
