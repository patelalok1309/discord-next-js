"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "query-string";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";
import { useEffect } from "react";

const formSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Channel name is required",
        })
        .refine((name) => name !== "general", {
            message: "Channel name cannot be 'general'",
        }),
    type: z.nativeEnum(ChannelType),
});

export const EditChannelModal = () => {
    const { data, isOpen, onClose, type } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "editChannel";
    const { server, channel } = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channel?.type || ChannelType.TEXT,
        },
    });

    useEffect(() => {
        if (channel) {
            form.setValue("name", channel.name);
            form.setValue("type", channel.type);
        }
    }, [form, channel]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id,
                },
            });
            await axios.patch(url, values);

            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log("ERROR", error);
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-popover text-popover-foreground p-0 overflow-hidden border border-border/40 shadow-lg">
                <DialogHeader className="pt-8 px-8">
                    <DialogTitle className="text-2xl text-center font-bold text-zinc-900 dark:text-zinc-100">
                        Edit channel
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase font-bold text-zinc-500 text-xs dark:text-zinc-400">
                                            Channel Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-100 dark:bg-zinc-900 border border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-800 dark:text-zinc-100 focus-visible:border-primary"
                                                placeholder="Enter channel name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase font-bold text-zinc-500 text-xs dark:text-zinc-400">Channel Type</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-100 dark:bg-zinc-900 border border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 capitalize outline-none text-zinc-800 dark:text-zinc-100 focus-visible:border-primary">
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-popover border border-border/50 text-popover-foreground">
                                                {Object.values(ChannelType).map(
                                                    (type) => (
                                                        <SelectItem
                                                            key={type}
                                                            value={type}
                                                            className="hover:bg-channel-hover cursor-pointer capitalize text-zinc-800 dark:text-zinc-200"
                                                        >
                                                            {type.toLowerCase()}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter className="bg-zinc-100 dark:bg-black/20 px-6 py-4 -mx-6">
                                <Button
                                    disabled={isLoading}
                                    variant={"primary"}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditChannelModal;
