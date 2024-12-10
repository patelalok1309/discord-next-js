"use client";
import axios from "axios";
import qs from "query-string";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
    const router = useRouter();

    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "deleteChannel";
    const { server, channel } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id,
                },
            });

            await axios.delete(url);
            onClose();
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-8">
                    <DialogTitle className="text-2xl text-center font-bold ">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        This action is not reversible ! Are you sure you want to
                        delete{" "}
                        <span className="font-semibold text-indigo-500">
                            # {channel?.name} ?
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <DialogHeader>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <div className="flex items-center justify-between w-full">
                            <Button
                                disabled={isLoading}
                                onClick={onClose}
                                variant={"ghost"}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={isLoading}
                                onClick={onClick}
                                variant={"primary"}
                            >
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteChannelModal;
