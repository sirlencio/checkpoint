import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
    const response = await updateSession(request);

    const { pathname } = request.nextUrl;
    if ((pathname.startsWith("/profile"))) {
        const token = request.cookies.get("sb-pigflomlviodiudalesv-auth-token");
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    ],
};
