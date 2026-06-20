"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}
const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${id}`);
    };

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div
                    className={cn(
                        "absolute left-0 bg-primary rounded-r-full transition-all duration-200 w-[4px]",
                        params?.serverId !== id && "group-hover:h-[20px]",
                        params?.serverId === id ? "h-[36px]" : "h-[8px]"
                    )}
                />
                <div
                    className={cn(
                        "relative flex mx-3 h-[48px] w-[48px] rounded-full transition-all duration-200 overflow-hidden group-hover:scale-105 border border-transparent",
                        params?.serverId === id &&
                            "border-primary shadow-glow ring-2 ring-primary/20 bg-primary/10 text-primary"
                    )}
                >
                    <Image fill src={imageUrl} alt="Channel" sizes="max-width: 100%; max-height: 100%;" />
                </div>
            </button>
        </ActionTooltip>
    );
};

export default NavigationItem;
