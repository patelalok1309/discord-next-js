"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "query-string";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required",
    }),
});

export const MessageFileModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const { apiUrl, query } = data;
    const isModalOpen = isOpen && type === "messageFile";

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query: query,
            });

            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });
            form.reset();
            router.refresh();
            handleClose();
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
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
                        Send a file as a message
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
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter className="bg-zinc-100 dark:bg-black/20 px-6 py-4 -mx-6">
                                <Button
                                    disabled={isLoading}
                                    variant={"primary"}
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default MessageFileModal;
