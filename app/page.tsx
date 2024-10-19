import Image from "next/image";
// assets
import images from "@/constants/images";

// This page is used to validate user authentication status
const RootPage: React.FC = () => {
    return (
        <main className="w-full h-screen flex items-center justify-center">
            <Image 
                src={images.landingLogo} 
                alt="LOGO"
                className="w-[400px]"
                width={400}
            />
        </main>
    );
};

export default RootPage;