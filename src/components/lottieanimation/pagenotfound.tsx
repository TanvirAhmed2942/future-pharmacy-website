"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const LOTTIE_PATH = "/lottiefiles/page_not_found.lottie";

export const PageNotFoundAnimation = () => {
    const [src, setSrc] = useState<string | null>(null);
    const pathname = usePathname();
    useEffect(() => {
        setSrc(`${window.location.origin}${LOTTIE_PATH}`);
    }, []);

    if (!src) return <div className="w-full h-full" />;

    return (

        <div className="flex flex-col items-center justify-center gap-4">
            <DotLottieReact
                className=" object-cover"
                src={src}
                width={500}
                height={500}
                loop
                autoplay
            />
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-2xl font-bold">Page Not Found</p>
                <p className="text-sm text-gray-500">Pathname: <span className="font-bold text-peter">{pathname}</span></p>
            </div>
        </div>

    );
};
//OK