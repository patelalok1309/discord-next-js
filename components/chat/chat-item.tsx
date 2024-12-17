"use client";

import { Member, MemberRole, Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { redirect, useRouter } from "next/navigation";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-50" />,
    ADMIN: <ShieldAlert className="w-4 h-4 ml-2 text-indigo-50" />,
};

const formSchema = z.object({
    content: z.string().min(1),
});

const ChatItem: React.FC<ChatItemProps> = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketQuery,
    socketUrl,
}) => {
    const { onOpen } = useModal();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [fileType, setFileType] = useState<"image" | "pdf" | "unknown">(
        "unknown"
    );

    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
    const canEditMessage = !deleted && isOwner && !fileUrl;
    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    useEffect(() => {
        const fetchFileType = async () => {
            const response = await axios.head(fileUrl || "");
            const contentType = response.headers["content-type"];

            if (contentType.startsWith("image/")) {
                setFileType("image");
            } else if (contentType === "application/pdf") {
                setFileType("pdf");
            }
        };

        if (fileUrl) {
            fetchFileType();
        }
    }, [fileUrl]);

    useEffect(() => {
        form.reset({
            content: content,
        });
    }, [content]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.keyCode === 27) {
                setIsEditing(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery,
            });

            await axios.patch(url, values);
            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log("ERROR", error);
        }
    };

    const onClick = () => {
        router.push(`/servers/${socketQuery.serverId}/conversations/${id}`);
    };

    return (
        <div className="relative gruop flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div
                    onClick={onClick}
                    className="cursor-pointer hover:drop-shadow-md transition"
                >
                    <UserAvatar src={member.profile.imageUrl} />
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p
                                onClick={onClick}
                                className="font-semibold text-sm hover:underline cursor-pointer"
                            >
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 ">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover"
                                sizes="max-width: 100%; max-height: 100%;"
                            />
                        </a>
                    )}

                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                            >
                                <p className="text-center max-w-[400px] truncate break-words">
                                    PDF file
                                </p>
                            </a>
                        </div>
                    )}

                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                "text-sm text-zinc-600 dark:text-zinc-300",
                                deleted && "italic text-zinc-500 text-xs mt-1"
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex items-center w-full gap-x-1 pt-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        disabled={isLoading}
                                                        className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                                        placeholder="Edit your message"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={isLoading}
                                    size={"sm"}
                                    variant={"primary"}
                                >
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] mt-1 text-zinc-400">
                                Please Esc to cancel, Enter to save
                            </span>
                        </Form>
                    )}
                </div>
                {canDeleteMessage && (
                    <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                        {canEditMessage && (
                            <ActionTooltip label="Edit">
                                <Edit
                                    onClick={() => setIsEditing(true)}
                                    className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 transition"
                                />
                            </ActionTooltip>
                        )}
                        <ActionTooltip label="Delete">
                            <Trash
                                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 transition"
                                onClick={() =>
                                    onOpen("deleteMessage", {
                                        apiUrl: `${socketUrl}/${id}`,
                                        query: socketQuery,
                                    })
                                }
                            />
                        </ActionTooltip>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatItem;
