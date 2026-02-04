"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
const LOTTIE_PATH = "/lottiefiles/waving_american_flag.lottie";

export const FlagAnimation = () => {
    const [src, setSrc] = useState<string | null>(null);
    useEffect(() => {
        setSrc(`${window.location.origin}${LOTTIE_PATH}`);
    }, []);

    if (!src) return <div className="w-full h-full" />;

    return (

        // <div className="flex flex-col items-center justify-center gap-4">
        <DotLottieReact
            className=" object-cover  w-40 h-40 p-0"
            src={src}
            width={500}
            height={500}
            loop
            autoplay
        />
        // </div>

    );
};