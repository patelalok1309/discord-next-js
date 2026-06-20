import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import NavigationAction from "./NavigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { ModeToggle } from "../theme-toggler";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/setup");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    return (
        <div className="space-y-4 items-center flex flex-col h-full text-primary w-full bg-sidebar py-3 border-r border-divider/25">
            <NavigationAction />
            <Separator className="h-[2px] bg-divider rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton 
                    appearance={{
                        elements : {
                            avatarBox : "h-[48px] w-[48px]"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default NavigationSidebar;
