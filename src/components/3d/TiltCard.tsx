"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    rotationIntensity?: number;
}

export function TiltCard({ children, className, rotationIntensity = 20, ...props }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate percentage (-0.5 to 0.5)
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        // Multiply by intensity (inverted Y for natural tilt)
        setRotateX(yPct * -rotationIntensity);
        setRotateY(xPct * rotationIntensity);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div
            className={cn("group/tilt relative [perspective:1000px]", className)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <div
                ref={ref}
                className="w-full h-full transition-transform duration-100 ease-out [transform-style:preserve-3d]"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
            >
                <div className="w-full h-full [transform-style:preserve-3d]">
                    {/* Add a subtle shine/glare effect */}
                    <div
                        className="absolute inset-0 z-10 opacity-0 group-hover/tilt:opacity-40 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: `linear-gradient(${135 + rotateY}deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)`
                        }}
                    />
                    {children}
                </div>
            </div>
        </div>
    );
}

export function TiltCardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("[transform:translateZ(50px)]", className)}
            {...props}
        >
            {children}
        </div>
    )
}
