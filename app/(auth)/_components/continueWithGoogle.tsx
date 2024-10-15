import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
// assets
import icons from "@/constants/icons"


const ContinueWithGoogleBtn = () => {
    return (
        <Button
            asChild
            variant="outline"
            className="mt-4 px-6"
        >
            <Link href="/">
                <Image
                    src={icons.Google}
                    alt="google"
                    className="size-4 mr-2"
                />
                <span>
                    Continue with Google
                </span>
            </Link>
        </Button>
    )
}

export default ContinueWithGoogleBtn