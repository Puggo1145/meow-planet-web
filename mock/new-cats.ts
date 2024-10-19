import type { INewCatsItemProps } from "@/app/(main)/today/_components/new-cats/new-cats-item";
// mock assets
import images from "@/constants/images";

export const mockNewCats: INewCatsItemProps[] = [
    {
        id: 1,
        image: images.mockCat1,
        name: "豆豆",
    },
    {
        id: 2,
        image: images.mockCat2,
        name: "小黑",
    },
    {
        id: 3,
        image: images.mockCat3,
        name: "小白",
    }
];