import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
// assets
import icons from "@/constants/icons"


const AuthBtns = () => {
    const authButtons = [
        {
            icon: icons.QQ,
            text: '使用 QQ 登录',
        },
        {
            icon: icons.Wechat,
            text: '使用微信登录',
        },
        {
            icon: icons.Google,
            text: '使用谷歌账号登录',
        },
    ]
    
    return (
        <div className="flex flex-col items-center">
            {authButtons.map((button, index) => (
                <AuthButton key={index} icon={button.icon}>
                    {button.text}
                </AuthButton>
            ))}
        </div>
    )
}

export default AuthBtns


interface IAuthButtonProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    children: React.ReactNode;
}

const AuthButton = ({ icon, children }: IAuthButtonProps) => {
    return (
        <Button
            asChild
            variant="outline"
            className="w-[240px] mt-4"
        >
            <Link href="/">
                <Image
                    src={icon}
                    alt="google"
                    className="size-4 mr-2"
                />
                <span>
                    {children}
                </span>
            </Link>
        </Button>
    )
}
