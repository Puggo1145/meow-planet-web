import type { StaticImageData } from "next/image"
import images from "./images";

interface UserRoleEnums {
    alias: string;
    image: StaticImageData;
}

export const UserRoleEnums: Record<string, UserRoleEnums> = {
    Admins: {
        alias: "系统管理员",
        image: images.badges.adminBadge,
    },
    catMaintainer: {
        alias: "图鉴管理员",
        image: images.badges.catMaintainerBadge,
    },
}
