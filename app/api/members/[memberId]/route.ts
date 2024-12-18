import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ memberId: string }> }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();
        const { memberId } = await params;

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server id is required", { status: 400 });
        }
        if (!memberId) {
            return new NextResponse("Member id is required", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: memberId,
                            profileId: {
                                not: profile.id,
                            },
                        },
                        data: {
                            role: role,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBER_ID_PATCH_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    params: Promise<{ memberId: string }>
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { memberId } = await params;
        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("server ID missing", { status: 400 });
        }
        if (!memberId) {
            return new NextResponse("Member ID missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: memberId,
                        profileId: {
                            not: profile.id,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBER_ID_DELETE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
