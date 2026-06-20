"use client";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import QRCodeGenerator from "../qr-code-generator";

export const InviteModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(
                `/api/servers/${server?.id}/invite-code`
            );
            onOpen("invite", { server: response?.data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-popover text-popover-foreground p-0 overflow-hidden border border-border/40 shadow-lg">
                <DialogHeader className="pt-8 px-8">
                    <DialogTitle className="text-2xl text-center font-bold text-zinc-900 dark:text-zinc-100">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        Server invite link
                    </Label>

                    <div className="flex justify-center items-center my-4 shadow-md w-fit mx-auto p-4 rounded-lg bg-white dark:bg-zinc-900 border border-border/40">
                        <QRCodeGenerator link={inviteUrl} />
                    </div>

                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-100 dark:bg-zinc-900 border border-border/50 focus-visible:ring-0 text-zinc-800 dark:text-zinc-100 focus-visible:ring-offset-0 focus-visible:border-primary"
                            value={inviteUrl}
                            onChange={() => {}}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={onCopy}
                            size={"icon"}
                        >
                            {copied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>

                    <Button
                        disabled={isLoading}
                        variant={"link"}
                        className="text-xs text-zinc-500 dark:text-zinc-400 mt-4"
                        onClick={onNew}
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default InviteModal;
