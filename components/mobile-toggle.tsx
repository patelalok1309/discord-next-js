import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation/NavigationSidebar";
import ServerSidebar from "./server/server-sidebar";

const MobileToggle = ({ serverId }: { serverId: string }) => {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="md:hidden"
                    >
                        <Menu />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="p-0 flex gap-0">
                    <div className="w-[72px]">
                        <NavigationSidebar />
                    </div>
                    <ServerSidebar serverId={serverId} />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileToggle;
