import { pusherClient } from "@/lib/pusher";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
    channelId: string;
};

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey,
    channelId,
}: ChatSocketProps) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        pusherClient.subscribe(channelId);

        const newMessageHandler = (message: MessageWithMemberWithProfile) => {
            console.log("new message use-chat-socket", message);
            queryClient.setQueryData([queryKey], (oldData: any) => {
                console.log("oldData", oldData);
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [
                            {
                                items: [message],
                            },
                        ],
                    };
                }

                const newData = [...oldData.pages];

                newData[0] = {
                    ...newData[0],
                    items: [message, ...newData[0].items],
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        };

        const updateMessageHandler = (
            message: MessageWithMemberWithProfile
        ) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData;
                }

                const newData = oldData.pages.map((page: any) => {
                    return {
                        ...page,
                        items: page.items.map(
                            (item: MessageWithMemberWithProfile) => {
                                if (item.id === message.id) {
                                    return message;
                                }
                                return item;
                            }
                        ),
                    };
                });

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        };

        pusherClient.bind(addKey, newMessageHandler);
        pusherClient.bind(updateKey, updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(channelId);
            pusherClient.unbind(addKey, newMessageHandler);
            pusherClient.unbind(updateKey, updateMessageHandler);
        };
    }, [channelId, addKey, queryClient, updateKey]);
};
