import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const InviteCodePage = async ({ params }: any) => {
    const profile = await currentProfile();

    if (!params.inviteCode) {
        return redirect("/setup");
    }

    if (!profile) {
        // Preserve the invite URL so Clerk redirects back here after authentication
        return redirect(`/sign-in?redirect_url=/invite/${params.inviteCode}`);
    }

    // Already a member → go directly to the server
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    // Validate the invite code before attempting the update
    const validServer = await db.server.findUnique({
        where: { inviteCode: params.inviteCode },
    });

    if (!validServer) {
        // Invalid or expired invite code
        return redirect("/");
    }

    // Join the server
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [{ profileId: profile.id }],
            },
        },
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return redirect("/");
};

export default InviteCodePage;
