import Image from "next/image"
// assets
import icons from "@/constants/icons"
import images from "@/constants/images"

const AuthHeader: React.FC = () => {
    return (
        <header className="relative hidden lg:block lg:w-[480px] h-full p-4">
            <div className="size-full bg-primary dark:bg-primary/40 p-6 rounded-2xl">
                <Image
                    src={icons.logoWhite}
                    alt="logo"
                    className="size-12"
                />
                <h1 className="mt-4 text-2xl font-bold tracking-widest text-primary-foreground">
                    让美好发生
                </h1>
                <Image
                    src={images.auth.authIllustration1}
                    alt="illustration"
                    width={640}
                    height={640}
                    className="absolute bottom-12 left-16 w-full"
                />
            </div>
        </header>
    )
}

export default AuthHeader
