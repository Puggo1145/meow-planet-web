// ui
import {
    ScrollArea,
    ScrollBar
} from "@/components/ui/scroll-area";
// components
import { NewCatsHeader } from "./new-cats-header";
import { NewCatsItem } from "./new-cats-item";
// mock
import { mockNewCats } from "@/mock/new-cats";

const newCats: React.FC = () => {
    return (
        <div className="flex flex-col">
            <NewCatsHeader />
            <ScrollArea className="w-full">
                <ul className="flex items-center gap-x-3">
                    {mockNewCats.map((item) => (
                        <NewCatsItem
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            name={item.name}
                        />
                    ))}
                </ul>
                <ScrollBar
                    orientation="horizontal"
                    className="hidden"
                />
            </ScrollArea>
        </div>
    );
};

export default newCats;