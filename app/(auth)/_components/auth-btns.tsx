import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
// assets
import icons from "@/constants/icons"


const AuthBtns = () => {
    const authButtons = [
        {
            icon: icons.Google,
            text: 'Continue with Google',
        },
        {
            icon: icons.QQ,
            text: 'Continue with QQ',
        },
        {
            icon: icons.Wechat,
            text: 'Continue with Wechat',
        }
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
