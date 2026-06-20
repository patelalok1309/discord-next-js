"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
const NavigationAction = () => {

    const { isOpen , onOpen } = useModal();

    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a server">
                <button className="group">
                    <div 
                    onClick={() => onOpen("createServer")}
                    className="flex mx-3 h-[48px] w-[48px] rounded-full transition-all duration-200 overflow-hidden items-center justify-center bg-background dark:bg-zinc-800 group-hover:scale-105 group-hover:bg-primary group-hover:shadow-glow text-zinc-500 group-hover:text-white border border-transparent">
                        <Plus
                            className="transition"
                            size={25}
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
};

export default NavigationAction;
