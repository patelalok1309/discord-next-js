import { Hash } from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";
import ConversationStatus from "./conversation-status";
import OnlineDot from "./online-dot";

interface ChatHeaderProps {
    name: string;
    serverId: string;
    type: "channel" | "conversation";
    imageUrl?: string;
    /** profileId of the other participant — required when type === "conversation" */
    otherProfileId?: string;
}

// This remains a Server Component — no "use client".
// Presence UI is delegated to ConversationStatus and OnlineDot (both client components)
// so that MobileToggle → NavigationSidebar → @clerk/nextjs/server is never pulled
// into the client bundle.
const ChatHeader = ({
    name,
    serverId,
    type,
    imageUrl,
    otherProfileId,
}: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-4 flex items-center h-14 bg-chat-bg/70 backdrop-blur-[12px] border-b border-divider/30 sticky top-0 z-10 w-full transition duration-200">
            <MobileToggle serverId={serverId} />

            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}

            {type === "conversation" && (
                <div className="relative mr-2 flex-shrink-0">
                    <UserAvatar
                        src={imageUrl}
                        name={name}
                        className="h-8 w-8"
                    />
                    {otherProfileId && (
                        <OnlineDot
                            serverId={serverId}
                            profileId={otherProfileId}
                        />
                    )}
                </div>
            )}

            <div className="flex flex-col justify-center">
                <p className="font-semibold text-md text-zinc-900 dark:text-zinc-100 leading-tight">
                    {name}
                </p>
                {type === "conversation" && otherProfileId && (
                    <ConversationStatus
                        serverId={serverId}
                        otherProfileId={otherProfileId}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
