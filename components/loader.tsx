// icons
import { Loader2 } from "lucide-react";
// utils
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const loaderVariants = cva(
  "animate-spin",
  {
    variants: {
      color: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        white: "text-white",
      },
      size: {
        default: "h-6 w-6",
        sm: "h-4 w-4",
        lg: "h-8 w-8",
        xl: "h-10 w-10",
      },
    },
    defaultVariants: {
      color: "default",
      size: "default",
    },
  }
);

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  color,
  size,
  className,
}) => {
  return (
    <Loader2
      className={cn(loaderVariants({ color, size }), className)}
    />
  );
};
