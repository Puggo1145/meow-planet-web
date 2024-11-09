"use client"

// import { Button } from "@/components/ui/button"
// components
import { UploadAvatar } from "@/components/upload-avatar"
// icons
// import { Pencil } from "lucide-react"
// store
import { useUserStore } from "@/store/use-user"
// components
import { ThemeToggle } from "@/components/theme-toggle"

export const UserInfo = () => {
    const { user } = useUserStore();

    return (
        <section className="w-full flex items-center justify-between gap-x-8">
            <div className="flex items-center gap-x-6">
                <UploadAvatar size="lg" />
                <div className="flex flex-col gap-y-1">
                    <p className="text-xl font-bold">
                        {user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                        {user?.email}
                    </p>
                </div>
            </div>
            <ThemeToggle />
            {/* <Button variant="outline">
                <Pencil className="size-4 mr-2" />编辑
            </Button> */}
        </section>
    )
}
