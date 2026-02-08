"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Float } from "@react-three/drei";

// Fallback random generation if maath is not installed or has issues
function generateSpherePoints(count: number, radius: number) {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
}

function Stars(props: any) {
    const ref = useRef<any>(null);
    // Use state to generate points once
    const [sphere] = useState(() => generateSpherePoints(5000, 1.2));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingShape() {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#4f46e5" // Indigo-600
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
            <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#818cf8" // Indigo-400
                    opacity={0.1}
                    transparent
                    roughness={0.1}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function HeroCanvas() {
    return (
        <div className="w-full h-full absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <group rotation={[0, 0, Math.PI / 4]}>
                    <Stars />
                    <FloatingShape />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                </group>
                <Preload all />
            </Canvas>
        </div>
    );
}
