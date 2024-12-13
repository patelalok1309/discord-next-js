"use client";

import { Member, Message, Profile } from "@prisma/client";
import React, { Fragment } from "react";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, MessageSquare, ServerCrash } from "lucide-react";
import ChatItem from "./chat-item";
import { format } from "date-fns";

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChatMessages: React.FC<ChatMessagesProps> = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}) => {
    const queryKey = `chat:${chatId}`;

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue,
        });

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading Messages...
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-y-auto py-4">
            <div className="flex-1" />
            <ChatWelcome type={type} name={name} />
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map(
                            (message: MessageWithMemberWithProfile) => {
                                return (
                                    <ChatItem
                                        key={message.id}
                                        id={message.id}
                                        currentMember={member}
                                        member={message.member}
                                        content={message.content}
                                        fileUrl={message.fileUrl}
                                        deleted={message.deleted}
                                        timestamp={format(
                                            new Date(message.createdAt),
                                            DATE_FORMAT
                                        )}
                                        isUpdated={
                                            message.createdAt !==
                                            message.updatedAt
                                        }
                                        socketUrl={socketUrl}
                                        socketQuery={socketQuery}
                                    />
                                );
                            }
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ChatMessages;
