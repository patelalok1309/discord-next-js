"use client";

import { Hash } from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";
import { useOnlineUsers } from "@/hooks/use-online-users";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
    name: string;
    serverId: string;
    type: "channel" | "conversation";
    imageUrl?: string;
    otherProfileId?: string;
}

const ChatHeader = ({
    name,
    serverId,
    type,
    imageUrl,
    otherProfileId,
}: ChatHeaderProps) => {
    const { isOnline } = useOnlineUsers(serverId);
    const online = type === "conversation" && !!otherProfileId && isOnline(otherProfileId);

    return (
        <div className="text-md font-semibold px-4 flex items-center h-14 bg-chat-bg/70 backdrop-blur-[12px] border-b border-divider/30 sticky top-0 z-10 w-full transition duration-200">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}
            {type === "conversation" && (
                <div className="relative mr-2">
                    <UserAvatar
                        src={imageUrl}
                        name={name}
                        className="h-8 w-8"
                    />
                    {/* Online presence dot in chat header */}
                    <span
                        className={cn(
                            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-[2px] ring-[hsl(var(--chat-area))] transition-colors duration-300",
                            online
                                ? "bg-green-500"
                                : "bg-zinc-400 dark:bg-zinc-600"
                        )}
                        title={online ? "Online" : "Offline"}
                    />
                </div>
            )}
            <div className="flex flex-col justify-center">
                <p className="font-semibold text-md text-zinc-900 dark:text-zinc-100 leading-tight">
                    {name}
                </p>
                {type === "conversation" && (
                    <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 leading-none">
                        {online ? "Online" : "Offline"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
