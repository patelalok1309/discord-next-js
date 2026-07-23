"use client";

import { useOnlineUsers } from "@/hooks/use-online-users";
import { cn } from "@/lib/utils";

interface ConversationStatusProps {
    serverId: string;
    otherProfileId: string;
}

/**
 * Client-only sliver that subscribes to Pusher Presence and renders
 * the online dot + status text. Keeping this separate ensures chat-header.tsx
 * stays a server component (so it can safely import MobileToggle → NavigationSidebar).
 */
const ConversationStatus = ({
    serverId,
    otherProfileId,
}: ConversationStatusProps) => {
    const { isOnline } = useOnlineUsers(serverId);
    const online = isOnline(otherProfileId);

    return (
        <span
            className={cn(
                "text-[11px] font-medium leading-none transition-colors duration-300",
                online
                    ? "text-green-500"
                    : "text-zinc-400 dark:text-zinc-500"
            )}
        >
            {online ? "● Online" : "● Offline"}
        </span>
    );
};

export default ConversationStatus;
