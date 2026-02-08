"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function DistortedSphere() {
    const ref = useRef<any>(null);
    const [hovered, setHovered] = useState(false);
    const [targetDistort, setTargetDistort] = useState(0.4);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            // Rotate
            ref.current.rotation.y = t * 0.4;
            ref.current.rotation.x = t * 0.2;

            // Smoothly interpolate distortion
            const currentDistort = ref.current.material.distort || 0.4;
            ref.current.material.distort = THREE.MathUtils.lerp(
                currentDistort,
                hovered ? 0.7 : 0.4,
                0.05
            );
        }
    });

    return (
        <Sphere
            args={[1, 64, 64]}
            scale={2.5}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <MeshDistortMaterial
                ref={ref}
                color={hovered ? "#a78bfa" : "#7c3aed"} // Violet-400 (lighter) on hover, Violet-600 default
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.2}
                roughness={0.1}
                distort={0.4}
                speed={2}
            />
        </Sphere>
    );
}

export default function ContactShape() {
    return (
        <div className="w-full h-[400px] flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 7]} intensity={1} color="#ffffff" />
                <directionalLight position={[-5, -10, -7]} intensity={0.5} color="#d8b4fe" />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <DistortedSphere />
                </Float>
            </Canvas>
        </div>
    );
}
