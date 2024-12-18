"use client";

import React, { Fragment, useRef, ElementRef } from "react";
import { Member, Message, Profile } from "@prisma/client";
import { ArrowUp, Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";

import ChatWelcome from "./chat-welcome";
import ChatItem from "./chat-item";

import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-scroll-hook";

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
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;

    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue,
        });

    useChatSocket({
        addKey,
        updateKey,
        queryKey,
        channelId: chatId,
    });

    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
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
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="w-7 h-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        );
    }

    return (
        <div
            ref={chatRef}
            className="flex-1 flex flex-col overflow-y-auto py-4"
        >
            {!hasNextPage && (
                <>
                    <div className="flex-1" />
                    <ChatWelcome type={type} name={name} />
                </>
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                    ) : (
                        <button
                            onClick={() => fetchNextPage()}
                            className="flex flex-row justify-center items-center text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition text-xs my-4"
                        >
                            Load previous messages
                            <ArrowUp className="w- h-5 ml-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition text-xs" />
                        </button>
                    )}
                </div>
            )}
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
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatMessages;
