"use client"

/**
 * This page is used to validate user authentication status 
 * and redirect user to the appropriate page
 */

import { useState, useEffect } from "react";
// components
import Image from "next/image";
import { Loader } from "@/components/loader";
// utils
import { useRouter } from "next/navigation";
// assets
import images from "@/constants/images";

type UserStatus = "loading" | "authenticated" | "unauthenticated";

const RootPage: React.FC = () => {
    const [status, setStatus] = useState<UserStatus>("loading");
    const router = useRouter();

    useEffect(() => {
        // if authenticated, redirect to /today
        if (status === "authenticated") {
            router.replace("/today");
        }
        // else, redirect to /sign-in
        else if (status === "unauthenticated") {
            router.replace("/sign-in");
        }
    }, [status]);

    // mock user authentication status
    setTimeout(() => {
        setStatus("authenticated");
    }, 1200);

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center">
            <Image
                src={images.landingLogo}
                alt="LOGO"
                className="w-[400px]"
                width={400}
            />
            <Loader size={36} className="text-primary" />
        </main>
    );
};

export default RootPage;