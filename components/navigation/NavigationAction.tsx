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
                    className="flex mx-3 h-[48px] w-[48px] rounded-full group-hover:rounded-lg transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus
                            className="group-hover:text-white transition text-emerald-500"
                            size={25}
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
};

export default NavigationAction;
