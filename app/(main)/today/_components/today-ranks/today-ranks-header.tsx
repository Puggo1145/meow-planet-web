// ui
import { Button } from "@/components/ui/button";
// components
import Link from "next/link";
// icon
import { ChevronRight } from "lucide-react";

export const TodayRanksHeader: React.FC = () => {
    return (
        <header className="py-6 flex items-center justify-between">
            <h1 className="text-2xl font-black">
                排行榜
            </h1>
            <Button 
                variant="ghost"
                className="text-muted-foreground"
                asChild
            >
                <Link href="/ranking">
                    更多
                    <ChevronRight size={16} />
                </Link>
            </Button>
        </header>
    );
};
