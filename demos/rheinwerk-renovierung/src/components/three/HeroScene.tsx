"use client";

import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Group } from "three";

function MaterialBlock({ position, rotation, scale, color, metalness = 0 }: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number]; color: string; metalness?: number }) {
  return (
    <RoundedBox args={[1, 1, 1]} radius={0.055} smoothness={4} position={position} rotation={rotation} scale={scale}>
      <meshStandardMaterial color={color} roughness={metalness ? 0.26 : 0.68} metalness={metalness} />
    </RoundedBox>
  );
}

function RoomComposition() {
  const group = useRef<Group>(null);
  const reduceMotion = useReducedMotion();
  const { pointer } = useThree();
  useFrame((state, delta) => {
    if (!group.current || reduceMotion) return;
    const targetX = pointer.y * 0.08;
    const targetY = pointer.x * 0.12 + state.clock.elapsedTime * 0.018;
    group.current.rotation.x += (targetX - group.current.rotation.x) * delta * 2.5;
    group.current.rotation.y += (targetY - group.current.rotation.y) * delta * 2.5;
  });
  return (
    <group ref={group} position={[0.95, 0.1, 0]} rotation={[0.04, -0.18, 0]}>
      <Float speed={reduceMotion ? 0 : 0.9} rotationIntensity={0.08} floatIntensity={0.15}>
        <MaterialBlock position={[-0.9, 0.05, -0.55]} rotation={[0, 0.08, 0]} scale={[0.16, 2.7, 2.7]} color="#c9b9a4" />
        <MaterialBlock position={[0.45, -1.18, 0]} rotation={[0, 0, 0]} scale={[2.8, 0.14, 2.1]} color="#80654a" />
        <MaterialBlock position={[1.18, 0.2, -0.38]} rotation={[0, -0.08, 0]} scale={[0.15, 2.55, 2.45]} color="#d8d1c6" />
        <MaterialBlock position={[0.08, 0.55, 0.22]} rotation={[0, -0.18, 0.02]} scale={[1.45, 0.12, 1.04]} color="#efeae1" />
        <MaterialBlock position={[0.18, -0.17, 0.35]} rotation={[0.01, -0.18, 0]} scale={[1.25, 0.78, 0.1]} color="#8b755e" />
        <MaterialBlock position={[0.58, 0.05, 1.02]} rotation={[0.18, 0.08, 0.1]} scale={[0.53, 0.05, 0.53]} color="#b4a28e" />
        <MaterialBlock position={[1.18, 1.08, 0.5]} rotation={[0.1, -0.18, 0]} scale={[0.6, 0.05, 0.6]} color="#ece6dc" />
        <MaterialBlock position={[-0.55, 1.38, 0.44]} rotation={[0.18, 0.2, -0.08]} scale={[0.48, 0.05, 0.48]} color="#aa9277" />
        <MaterialBlock position={[1.55, -0.72, 0.78]} rotation={[0.1, 0.12, 0.22]} scale={[0.18, 1.2, 0.18]} color="#9a846f" metalness={0.68} />
      </Float>
      <ContactShadows position={[0, -1.38, 0]} opacity={0.36} scale={7} blur={2.8} far={4} resolution={256} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.15, 5.8], fov: 37 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={1.55} />
      <directionalLight position={[4, 5, 4]} intensity={3.1} color="#fff3dd" />
      <spotLight position={[-3, 2, 4]} intensity={22} angle={0.45} penumbra={1} color="#d7c2a7" />
      <RoomComposition />
    </Canvas>
  );
}
