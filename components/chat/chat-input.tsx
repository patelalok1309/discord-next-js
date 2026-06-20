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
                                <div className="relative p-4 pb-6">

                                    {/* Chat Attachments Button */}
                                    <ActionTooltip
                                        side="top"
                                        align="center"
                                        label="Add an attachment"
                                    >
                                        <button
                                            className="absolute left-8 top-[42px] -translate-y-1/2 h-[26px] w-[26px] bg-zinc-400 hover:bg-primary dark:bg-zinc-500 dark:hover:bg-primary transition rounded-full p-1 flex items-center justify-center z-10"
                                            type="button"
                                            onClick={() =>
                                                onOpen("messageFile", {
                                                    apiUrl,
                                                    query,
                                                })
                                            }
                                        >
                                            <Plus className="text-white h-4 w-4" />
                                        </button>
                                    </ActionTooltip>

                                    {/* Input Box */}
                                    <Input
                                        id="message-input-box"
                                        disabled={isLoading}
                                        className="h-[52px] pl-14 pr-24 bg-input border border-border/40 text-zinc-800 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 rounded-lg transition duration-200 w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary focus-visible:shadow-[0_0_0_4px_rgba(109,94,245,0.15)]"
                                        placeholder={`Message ${
                                            type === "conversation"
                                                ? name
                                                : "#" + name
                                        }`}
                                        {...field}
                                    />

                                    {/* Send/Emoji Group */} 
                                    <div className="absolute right-8 top-[42px] -translate-y-1/2 flex items-center space-x-3 z-10">
                                        {form.getValues("content")?.length >
                                            0 && (
                                                <ActionTooltip
                                                side="top"
                                                align="center"
                                                label="Send message"
                                            >
                                                <button
                                                    type="submit"
                                                    className="flex justify-center items-center h-8 w-8 rounded-full bg-primary hover:bg-primary-hover text-white transition shadow-sm"
                                                >
                                                    <SendHorizonal className="w-4 h-4" />
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
