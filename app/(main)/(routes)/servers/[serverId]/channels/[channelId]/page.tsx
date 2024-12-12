import ChatHeader from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PageProps {
    params: {
        channelId: string;
        serverId: string;
    };
}


interface ChannelIdPageProps extends PageProps {}

const channelId = async ({ params }: ChannelIdPageProps) => {
    const { channelId, serverId } = await params;
    const profile = await currentProfile();

    if (!profile) {
        return RedirectToSignIn;
    }

    const channel = await db.channel.findUnique({
        where: {
            id: channelId,
        },
    });

    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
    });

    if (!channel || !member) {
        return redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
        </div>
    );
};

export default channelId;
