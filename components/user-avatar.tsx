import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    src?: string;
    className?: string;
    name?: string;
}

const UserAvatar = ({ src, className, name }: UserAvatarProps) => {
    const getGradientClass = (nameString?: string) => {
        const gradients = [
            "from-[#6D5EF5] to-[#A855F7]",
            "from-[#00D4AA] to-[#06B6D4]",
            "from-[#F97316] to-[#EF4444]",
            "from-[#EC4899] to-[#8B5CF6]"
        ];
        if (!nameString) return gradients[0];
        let hash = 0;
        for (let i = 0; i < nameString.length; i++) {
            hash = nameString.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % gradients.length;
        return gradients[index];
    };

    // Get initials (up to 2 characters)
    const initials = name
        ? name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
        : "?";

    const gradient = getGradientClass(name);

    return (
        <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
            <AvatarImage src={src} className="object-cover" />
            <AvatarFallback className={cn("bg-gradient-to-br text-white font-bold text-[11px] md:text-sm uppercase select-none", gradient)}>
                {initials}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;
