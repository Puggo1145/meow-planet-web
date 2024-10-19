import Image from "next/image"
// assets
import icons from "@/constants/icons"


const AuthHeader: React.FC = () => {
    return (
        <header className="relative hidden lg:block lg:w-[480px] h-full bg-primary p-6">
            <Image 
                src={icons.logoWhite}
                alt="logo"
                className="size-12"
            />
            <h1 className="absolute text-2xl font-bold text-primary-foreground top-1/2 -translate-y-1/2">
                让美好发生
            </h1>
        </header>
    )
}

export default AuthHeader
