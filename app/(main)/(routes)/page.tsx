import { ModeToggle } from "@/components/theme-toggler";
import { UserButton } from "@clerk/nextjs";

const Home = () => {
    return (
        <div className="text-blue-400">
            <UserButton  />
            <ModeToggle />
        </div>
    );
};

export default Home;
