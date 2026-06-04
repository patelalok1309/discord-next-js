import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // get token from header
        const token = req.headers.get("X-KEEP-ALIVE-TOKEN");
        if (!token || token !== process.env.CRON_SECRET_TOKEN) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await db.profile.findFirst();

        return NextResponse.json({ message: "Keep alive" });
    } catch (error) {
        console.log("[CHANNELS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
