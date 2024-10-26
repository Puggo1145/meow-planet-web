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
import { Account } from "appwrite";
import { client } from "@/lib/appwrite";

type UserStatus = "loading" | "authenticated" | "unauthenticated";

const RootPage: React.FC = () => {
    const [status, setStatus] = useState<UserStatus>("loading");
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const account = new Account(client);
                await account.get();
                setStatus("authenticated");
            } catch (error) {
                setStatus("unauthenticated");
            }
        };

        checkAuthStatus();
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/today");
        } else if (status === "unauthenticated") {
            router.replace("/sign-in");
        }
    }, [status, router]);

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
