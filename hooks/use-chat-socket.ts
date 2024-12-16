// import { useSocket } from "@/components/providers/socket-provider";
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
    // const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        pusherClient.subscribe(channelId);

        const newMessageHandler = (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
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
                    items: [...newData[0].items, message],
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
        };
    }, [channelId, addKey]);

    // useEffect(() => {
    //     console.log("socket inside useEffect", socket);
    //     if (!socket) return;

    //     socket.on(
    //         "chat:1dc8e41d-dc57-4343-a1e5-c97da46c4a5b:messages",
    //         (message: any) => {
    //             console.log("message use-chat-socket", message);
    //             console.log("on addKey", message);
    //             queryClient.setQueryData([queryKey], (oldData: any) => {
    //                 if (
    //                     !oldData ||
    //                     !oldData.pages ||
    //                     oldData.pages.length === 0
    //                 ) {
    //                     return {
    //                         pages: [
    //                             {
    //                                 items: [message],
    //                             },
    //                         ],
    //                     };
    //                 }

    //                 const newData = [...oldData.pages];

    //                 newData[0] = {
    //                     ...newData[0],
    //                     items: [...newData[0].items, message],
    //                 };

    //                 return {
    //                     ...oldData,
    //                     pages: newData,
    //                 };
    //             });
    //         }
    //     );

    //     socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
    //         console.log("on UpdateKEY", message);
    //         queryClient.setQueryData([queryKey], (oldData: any) => {
    //             if (!oldData || !oldData.pages || oldData.pages.length === 0) {
    //                 return oldData;
    //             }

    //             const newData = oldData.pages.map((page: any) => {
    //                 return {
    //                     ...page,
    //                     items: page.items.map(
    //                         (item: MessageWithMemberWithProfile) => {
    //                             if (item.id === message.id) {
    //                                 return message;
    //                             }
    //                             return item;
    //                         }
    //                     ),
    //                 };
    //             });

    //             return {
    //                 ...oldData,
    //                 pages: newData,
    //             };
    //         });
    //     });

    //     socket.on(addKey, (message: MessageWithMemberWithProfile) => {
    //         console.log("on addKey", message);
    //         queryClient.setQueryData([queryKey], (oldData: any) => {
    //             if (!oldData || !oldData.pages || oldData.pages.length === 0) {
    //                 return {
    //                     pages: [
    //                         {
    //                             items: [message],
    //                         },
    //                     ],
    //                 };
    //             }

    //             const newData = [...oldData.pages];

    //             newData[0] = {
    //                 ...newData[0],
    //                 items: [...newData[0].items, message],
    //             };

    //             return {
    //                 ...oldData,
    //                 pages: newData,
    //             };
    //         });
    //     });

    //     return () => {
    //         socket.off(addKey);
    //         socket.off(updateKey);
    //     };
    // }, [queryClient, addKey, queryKey, socket, updateKey]);
};
