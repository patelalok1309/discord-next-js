"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { Plus, SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EmojiPicker from "@/components/emoji-picker";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
});

const ChatInput: React.FC<ChatInputProps> = ({ apiUrl, query, name, type }) => {
    const { onOpen } = useModal();
    const router = useRouter();
    
    const inputBox = document.getElementById("message-input-box");
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            await axios.post(url, values);
            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            if (inputBox) {
                setTimeout(() => {
                    inputBox.focus();
                }, 0);
            }
            console.log(inputBox);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-4">

                                    {/* Chat Attachments Button */}
                                    <ActionTooltip
                                        side="right"
                                        align="center"
                                        label="Add an attachment"
                                    >
                                        <button
                                            className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                                            type="button"
                                            onClick={() =>
                                                onOpen("messageFile", {
                                                    apiUrl,
                                                    query,
                                                })
                                            }
                                        >
                                            <Plus className="text-white dark:text-[#313338]" />
                                        </button>
                                    </ActionTooltip>

                                    {/* Input Box */}
                                    <Input
                                        id="message-input-box"
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                        placeholder={`Message ${
                                            type === "conversation"
                                                ? name
                                                : "#" + name
                                        }`}
                                        {...field}
                                    />

                                    {/* Send Button */} 
                                    <div className="absolute top-7 right-8 flex items-center space-x-4">
                                        {form.getValues("content")?.length >
                                            0 && (
                                                <ActionTooltip
                                                side="top"
                                                align="center"
                                                label="Add an attachment"
                                            >
                                                <button
                                                    type="submit"
                                                    className="flex justify-center items-center"
                                                >
                                                    <SendHorizonal className="w-6 h-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
                                                </button>
                                            </ActionTooltip>
                                        )}

                                        {/* Emoji Picker */}
                                        <EmojiPicker
                                            onChange={(emoji: string) =>
                                                field.onChange(
                                                    `${field.value}${emoji}`
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default ChatInput;
