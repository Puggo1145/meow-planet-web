// icons
import { Loader2 } from "lucide-react";
// utils
import { cn } from "@/lib/utils";

interface ILoaderProps {
    className?: string
    size?: number
}

export const Loader: React.FC<ILoaderProps> = ({
    className,
    size = 24
}) => {
  return (
    <Loader2
        className={cn("text-foreground animate-spin", className)}
        size={size}
    />
  );
};
