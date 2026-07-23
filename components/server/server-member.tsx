"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "../user-avatar";
import { useOnlineUsers } from "@/hooks/use-online-users";

interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
        <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
    const params = useParams();
    const router = useRouter();
    const { isOnline } = useOnlineUsers(server.id);

    const icon = roleIconMap[member.role];
    const online = isOnline(member.profileId);

    const onClick = () => {
        router.push(`/servers/${server?.id}/conversations/${member.id}`);
    };

    return (
        <button
            onClick={onClick}
            className={cn(
                "group px-2 py-1.5 rounded-[10px] flex items-center gap-x-3 w-full hover:bg-channel-hover transition duration-200 ease-in-out mb-1",
                params?.memberId === member.id &&
                    "bg-channel-selected text-primary dark:text-primary-soft shadow-sm"
            )}
        >
            <div className="relative flex-shrink-0">
                <UserAvatar
                    src={member.profile.imageUrl}
                    name={member.profile.name}
                    className="h-8 w-8"
                />
                {/* Online presence dot — green = online, zinc = offline */}
                <span
                    className={cn(
                        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-[2px] ring-sidebar-secondary transition-colors duration-300",
                        online ? "bg-green-500" : "bg-zinc-400 dark:bg-zinc-600"
                    )}
                    title={online ? "Online" : "Offline"}
                />
            </div>
            <p
                className={cn(
                    "font-medium text-xs text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 transition duration-200",
                    params?.memberId === member.id &&
                        "text-primary dark:text-primary-soft font-semibold"
                )}
            >
                {member.profile.name}
            </p>
            {icon}
        </button>
    );
};

export default ServerMember;
