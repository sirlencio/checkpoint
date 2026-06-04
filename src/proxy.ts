import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    ],
};
