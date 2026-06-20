import { Hash } from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/user-avatar";

interface ChatHeaderProps {
    name: string;
    serverId: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-4 flex items-center h-14 bg-chat-bg/70 backdrop-blur-[12px] border-b border-divider/30 sticky top-0 z-10 w-full transition duration-200">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}
            {type === "conversation" && (
                <UserAvatar
                    src={imageUrl}
                    name={name}
                    className="h-8 w-8 mr-2"
                />
            )}
            <p className="font-semibold text-md text-zinc-900 dark:text-zinc-100">
                {name}
            </p>
        </div>
    );
};

export default ChatHeader;
