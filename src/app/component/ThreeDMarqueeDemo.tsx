"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { useMemo } from "react";


export function ThreeDMarqueeDemo() {
    // Use unique images and duplicate them programmatically for better performance
    const uniqueImages = useMemo(() => [
        "https://i.ibb.co.com/Mx4YSm10/Clickup.png",
        "https://i.ibb.co.com/0RXvY79f/Abott.png",
        "https://i.ibb.co.com/R4s3q1dx/Linear.png",
        "https://i.ibb.co.com/gMkcpy1Q/Zapier.png",
        "https://i.ibb.co.com/SDBMZ7SN/Hashicrop.png",
        "https://i.ibb.co.com/nq6GPj1s/netlify.png",
        "https://i.ibb.co.com/vGGqh5f/gitLab.png",
        "https://i.ibb.co.com/vGGqh5f/gitLab.png",
        "https://i.ibb.co.com/vGGqh5f/gitLab.png"
        ,
    ], []);

    // Create the pattern by repeating the unique images
    const images = useMemo(() => {
        const pattern = [];
        // Repeat the pattern to fill the grid nicely (aim for 24-28 images total)
        for (let i = 0; i < 4; i++) {
            pattern.push(...uniqueImages);
        }
        return pattern.slice(0, 28); // Keep it at 28 for even distribution across 4 columns
    }, [uniqueImages]);

    return (
        <div className="my-10 lg:mx-[120px] bg-primary-dark p-2 ring-1 ring-neutral-700/10 dark:bg-primary-dark">
            <ThreeDMarquee images={images} />
        </div>
    );
}