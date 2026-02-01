"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";

const LOTTIE_PATH = "/lottiefiles/closed.lottie";

export const ClosedAnimation = () => {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        setSrc(`${window.location.origin}${LOTTIE_PATH}`);
    }, []);

    if (!src) return <div className="w-full h-full" />;

    return (
        <DotLottieReact
            className="w-full h-full"
            src={src}
            loop
            autoplay
        />
    );
};