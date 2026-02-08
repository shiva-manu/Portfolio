"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";

const skills = [
    "React", "Next.js", "TypeScript", "Node.js",
    "Tailwind", "Three.js", "GraphQL", "PostgreSQL",
    "MongoDB", "AWS", "Docker", "Git", "Figma",
    "Redux", "Express", "Python", "Java", "C++"
];

function Word({ children, ...props }: any) {
    const color = new THREE.Color();
    const { viewport } = useThree();
    // Responsive font size: 2.5 on desktop, scaled down on mobile
    const fontSize = Math.max(1.2, Math.min(2.5, viewport.width / 15));

    const fontProps = { fontSize: fontSize, letterSpacing: -0.05, lineHeight: 1, "material-toneMapped": false };
    const ref = useRef<any>(null);
    const [hovered, setHovered] = useState(false);
    // Need to handle position prop carefully as it might be passed in props but we modify it.
    // Actually Text component passes position to group usually if used that way, but here it's direct.
    // We should store initial position.
    const pos = props.position instanceof THREE.Vector3 ? props.position : new THREE.Vector3(...props.position);
    const startPos = useRef(pos);
    const [offset] = useState(() => new THREE.Vector3(Math.random(), Math.random(), Math.random()));

    const over = (e: any) => {
        e.stopPropagation();
        setHovered(true);
    };
    const out = () => setHovered(false);

    useFrame((state) => {
        if (ref.current) {
            // Theme: Violet-400 default, White hover
            ref.current.material.color.lerp(color.set(hovered ? "#ffffff" : "#a78bfa"), 0.1);

            // Floating motion
            const t = state.clock.getElapsedTime();
            ref.current.position.x = startPos.current.x + Math.sin(t + offset.x * 10) * 2;
            ref.current.position.y = startPos.current.y + Math.cos(t + offset.y * 10) * 2;
            ref.current.position.z = startPos.current.z + Math.sin(t + offset.z * 10) * 2;
            // Make sure text faces camera
            ref.current.lookAt(state.camera.position);
        }
    });

    return (
        <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps}>
            {children}
        </Text>
    );
}

function Connections({ positions }: { positions: THREE.Vector3[] }) {
    const { viewport } = useThree();
    // Tune max distance based on viewport width to prevent overcrowding on smaller screens
    const maxDist = Math.max(10, viewport.width / 4);

    const lines = useMemo(() => {
        const segments = [];
        // Connect each point to its nearest neighbors or random ones
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const dist = positions[i].distanceTo(positions[j]);
                // Only connect if close enough to form a web, but scattered
                if (dist < maxDist) {
                    segments.push(positions[i], positions[j]);
                }
            }
        }
        return segments;
    }, [positions, maxDist]);

    return (
        <Line
            points={lines}
            color="#a78bfa" // Violet-400
            opacity={0.1}
            transparent
            lineWidth={1}
        />
    );
}

function Cloud({ count = 8, radius = 30 }) {
    const { viewport } = useThree();

    // Create a scattered distribution of words
    const { words, positions } = useMemo(() => {
        const tempWords = [];
        const tempPositions: THREE.Vector3[] = [];

        // Spread more randomly across the total width/height of the viewport
        for (let i = 0; i < skills.length; i++) {
            const skill = skills[i];
            // Random position based on viewport size
            // viewport.width is the total width in 3D units at z=0
            const x = (Math.random() - 0.5) * viewport.width;
            const y = (Math.random() - 0.5) * viewport.height;
            const z = (Math.random() - 0.5) * 15; // Depth variation
            const pos = new THREE.Vector3(x, y, z);

            tempPositions.push(pos);
            tempWords.push([pos, skill]);
        }
        return { words: tempWords, positions: tempPositions };
    }, [viewport.width, viewport.height]);

    return (
        <>
            <Connections positions={positions} />
            {words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)}
        </>
    );
}

export default function SkillsCloud() {
    return (
        <div className="w-full h-full absolute inset-0 -z-10 opacity-70 pointer-events-auto">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 40], fov: 50 }}>
                <fog attach="fog" args={["#050505", 0, 80]} />
                <Cloud />
            </Canvas>
        </div>
    );
}
