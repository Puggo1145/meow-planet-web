"use client"

import { useState } from "react"
// ui
import { Button } from "@/components/ui/button"
// components
import { HeadingText, HeadingTextTitle, HeadingTextDescription } from '@/components/heading-text'
import { InfoSection, InfoSectionContent } from "@/components/info-section"
// icons
import { LogOut } from "lucide-react"
// store
import { useUserStore } from "@/store/use-user"
// components
import { Loader } from "@/components/loader"

export const UserSignOut = () => {
    const logout = useUserStore(state => state.logout)
    const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {
        setIsSigningOut(true)
        await logout()
        setIsSigningOut(false)
    }

    return (
        <InfoSection className="min-h-48">
            <HeadingText>
                <HeadingTextTitle>退出登录</HeadingTextTitle>
                <HeadingTextDescription className='max-w-xs'>
                </HeadingTextDescription>
            </HeadingText>

            <InfoSectionContent>
                <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex items-center gap-x-2"
                >
                    {isSigningOut ? (
                        <>
                            <Loader size="sm" />
                            <span>退出登录中...</span>
                        </>
                    ) : (
                        <>
                            <LogOut className="size-4" />
                            <span>退出登录</span>
                        </>
                    )}
                </Button>
            </InfoSectionContent>
        </InfoSection>
    )
} 