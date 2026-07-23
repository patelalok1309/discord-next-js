"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import type { Members } from "pusher-js";

/**
 * useOnlineUsers
 *
 * Subscribes to a Pusher Presence Channel for the given serverId.
 * Automatically tracks which profileIds are currently online.
 *
 * Edge cases handled:
 * - Tab / browser close  → WebSocket drops → pusher:member_removed fires
 * - System crash         → Pusher heartbeat timeout (~30s) → member_removed fires
 * - Sign out             → component unmounts → channel unsubscribed → member_removed fires
 * - Multiple tabs        → user stays online as long as ≥1 tab is subscribed
 * - Network flicker      → Pusher auto-reconnects; presence re-syncs on reconnect
 */
export const useOnlineUsers = (serverId: string) => {
    const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (!serverId) return;

        const channelName = `presence-server-${serverId}`;
        const channel = pusherClient.subscribe(channelName);

        // Called once when our subscription is confirmed.
        // `members` contains the full list of members currently in the channel.
        channel.bind("pusher:subscription_succeeded", (members: Members) => {
            const ids = new Set<string>();
            members.each((member: { id: string }) => {
                ids.add(member.id);
            });
            setOnlineUsers(ids);
        });

        // A new member joined (another user opened the app / a new tab)
        channel.bind("pusher:member_added", (member: { id: string }) => {
            setOnlineUsers((prev) => {
                const next = new Set(prev);
                next.add(member.id);
                return next;
            });
        });

        // A member left (closed tab, closed browser, crashed, signed out)
        channel.bind("pusher:member_removed", (member: { id: string }) => {
            setOnlineUsers((prev) => {
                const next = new Set(prev);
                next.delete(member.id);
                return next;
            });
        });

        // Cleanup: unsubscribing triggers pusher:member_removed for this socket on other clients
        return () => {
            pusherClient.unsubscribe(channelName);
        };
    }, [serverId]);

    /**
     * Returns true if the given profileId is currently online in this server.
     */
    const isOnline = (profileId: string): boolean => {
        return onlineUsers.has(profileId);
    };

    return { isOnline, onlineCount: onlineUsers.size };
};
