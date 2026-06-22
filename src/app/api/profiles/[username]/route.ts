import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getProfileWithUsername } from "@/lib/repositories/profilesRepo";

interface Props {
    params: Promise<{ username: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
    const { username } = await params;
    const supabase = await createClient();
    try {
        const profile = await getProfileWithUsername(supabase, username);
        return NextResponse.json(profile);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error desconocido";

        return new NextResponse(
            JSON.stringify({ error: message }),
            { status: 500 }
        );
    }
}
