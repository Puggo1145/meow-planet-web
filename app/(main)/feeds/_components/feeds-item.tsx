// components
import FeedsItemFns from "./feeds-item-fns";


// interface IFeedsItemProps {
//     avatar: string;
//     username: string;
//     time: string;
//     content: string;
//     images: string[];
//     views: number;
//     likes: number;
//     comments: number;
// }

const FeedsItem = () => {
    return (
        <li className="w-full p-6 rounded-2xl bg-secondary flex flex-col gap-y-4">
            <section className="flex items-center gap-x-4">
                <FeedsItemAvatar>
                    <></>
                </FeedsItemAvatar>
                <div className="flex flex-col">
                    <h6 className="text-sm font-bold leading-none">Antom</h6>
                    <p className="text-sm text-muted-foreground leading-none">3 hours ago</p>
                </div>
            </section>

            <section className="flex flex-col gap-y-4">
                <p className="max-w-3/4 leading-relaxed">
                    This piece of texts is used as a mock. This piece of texts is used as a mock.This piece of texts is used as a mock.
                </p>
                {/* MOCK IMAGES */}
                <div className="flex items-center gap-x-2">
                    <div className="w-[240px] h-[400px] rounded-xl bg-gray-200"></div>
                    <div className="w-[300px] h-[400px] rounded-xl bg-gray-200"></div>
                    <div className="w-[240px] h-[400px] rounded-xl bg-gray-200"></div>
                </div>
            </section>

            <FeedsItemFns />
        </li>
    )
}

export default FeedsItem


const FeedsItemAvatar = ({ children }: { children: React.ReactNode }) => {
    return (
        // TODO: 使用 Image 替代
        <div className="size-9 rounded-full overflow-hidden bg-white">
            {children}
        </div>
    )
}