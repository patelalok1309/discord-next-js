"use client";

import { useOnlineUsers } from "@/hooks/use-online-users";
import { cn } from "@/lib/utils";

interface OnlineDotProps {
    serverId: string;
    profileId: string;
}

/**
 * Client-only presence dot that overlays on top of a UserAvatar.
 * Green = online, zinc = offline.
 */
const OnlineDot = ({ serverId, profileId }: OnlineDotProps) => {
    const { isOnline } = useOnlineUsers(serverId);
    const online = isOnline(profileId);

    return (
        <span
            className={cn(
                "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-[2px] ring-[hsl(var(--chat-area))] transition-colors duration-300",
                online ? "bg-green-500" : "bg-zinc-400 dark:bg-zinc-600"
            )}
            title={online ? "Online" : "Offline"}
        />
    );
};

export default OnlineDot;
