"use client"

import Image from "next/image";
// components
import { Loader } from "@/components/loader";
// assets
import images from "@/constants/images";

const RootPage: React.FC = () => {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center">
            <Image
                src={images.landingLogo}
                alt="LOGO"
                className="w-[400px]"
                width={400}
                priority
            />
            <Loader size="xl" className="text-primary" />
        </main>
    );
};

export default RootPage;
