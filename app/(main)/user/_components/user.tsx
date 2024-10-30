"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// components
import { UploadAvatar } from "@/components/upload-avatar"
// icons
import { Pencil } from "lucide-react"
// store
import { useUserStore } from "@/store/use-user"

export const User = () => {
    const { user } = useUserStore();

    return (
        <section className="w-full flex items-center justify-between gap-x-8">
            <div className="flex items-center gap-x-6">
                <UploadAvatar size="lg" />
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="text-xl font-bold">
                            {user?.name}
                        </p>
                        <Badge>用户角色</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                        {user?.email}
                    </p>
                </div>
            </div>
            <Button variant="outline">
                <Pencil className="size-4 mr-2" />编辑
            </Button>
        </section>
    )
}
