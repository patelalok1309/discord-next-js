import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    params: Promise<{ channelId: string }>
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");
        const channelId = (await params).channelId;

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        // Validate server and permissions
        const server = await db.server.findFirst({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
                    },
                },
            },
        });

        if (!server) {
            return new NextResponse("Server not found or unauthorized", {
                status: 404,
            });
        }

        // Ensure the channel is not "general"
        const channel = await db.channel.findFirst({
            where: {
                id: channelId,
                name: { not: "general" },
                serverId: serverId,
            },
        });

        if (!channel) {
            return new NextResponse(
                "Channel not found or cannot delete 'general'",
                { status: 400 }
            );
        }

        // Delete the channel
        const deletedChannel = await db.channel.delete({
            where: { id: channelId },
        });

        return NextResponse.json({
            message: "Channel deleted successfully",
            channel: deletedChannel,
        });
    } catch (error) {
        console.error("[CHANNEL_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");
        const channelId = await params.channelId;

        const { name, type } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!channelId) {
            return new NextResponse("Channel ID missing", { status: 400 });
        }

        if (name === "general") {
            return new NextResponse("Name is not allowed to be 'general'", {
                status: 400,
            });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: channelId,
                            NOT: {
                                name: "general",
                            },
                        },
                        data: {
                            name,
                            type,
                        },
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[CHANNEL_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
