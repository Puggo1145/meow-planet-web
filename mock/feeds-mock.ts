import images from "@/constants/images";
// types
import { IFeedsItemProps } from "@/app/(main)/feeds/_components/feeds-item";


export const mockFeedsImages = [
    images.mockCat1,
    images.mockCat2,
    images.mockCat3,
]

export const mockFeeds: IFeedsItemProps[] = [
    {
        id: 1,
        avatar: "",
        username: "John Doe",
        time: "2 hours ago",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        images: mockFeedsImages,
        views: 100,
        likes: 200,
        comments: 300,
    },
    {
        id: 2,
        avatar: "",
        username: "Andrew Hudson",
        time: "3 hours ago",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
        images: mockFeedsImages,
        views: 400,
        likes: 500,
        comments: 600,
    },
]
