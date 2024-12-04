import NavigationSidebar from "@/components/navigation/NavigationSidebar";
import { ModalProvider } from "@/components/providers/modal-provider";
import "./styles.css"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="navigation-sidebar md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 ">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full relative">{children}</main>
        </div>
    );
};

export default MainLayout;
