"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required",
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required",
    }),
});

export const EditServerModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "editServer";
    const { server } = data;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (server) {
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl);
        }
    }, [server, form]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values);
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
                        Customize your profile
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
                        Give your server a personality with a name and an image.
                        You can always change it later.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                            <div className="flex justify-center items-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase font-bold text-zinc-500 text-xs dark:text-zinc-400">
                                            Server Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-100 dark:bg-zinc-900 border border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-800 dark:text-zinc-100 focus-visible:border-primary"
                                                placeholder="Enter server name"
                                                {...field}
                                            />
                                        </FormControl>
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

export default EditServerModal;
