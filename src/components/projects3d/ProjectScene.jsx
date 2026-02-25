import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

const canUseWebGL = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

const wrapProjectName = (name) => {
  if (name.length <= 16) {
    return name;
  }

  const words = name.split(' ');

  if (words.length < 2) {
    return name;
  }

  let firstLine = '';
  let secondLine = '';

  words.forEach((word) => {
    if (firstLine.length <= secondLine.length) {
      firstLine = firstLine ? `${firstLine} ${word}` : word;
    } else {
      secondLine = secondLine ? `${secondLine} ${word}` : word;
    }
  });

  return `${firstLine}\n${secondLine}`;
};

const pickNamePalette = (name) => {
  const palettes = [
    { main: '#F4E5CF', edge: '#2E211A', depth: '#8A563A' },
    { main: '#D7E4F6', edge: '#1A2734', depth: '#4A6A8F' },
    { main: '#D9F0DB', edge: '#1D2C1D', depth: '#4B6F4F' },
    { main: '#ECDCF8', edge: '#2B1C39', depth: '#7B5A9E' }
  ];

  const hash = Array.from(name).reduce((accumulator, letter) => accumulator + letter.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
};

function ProjectNameMesh({ name, isActive, isHovered, isReducedMotion }) {
  const groupRef = useRef(null);
  const label = useMemo(() => wrapProjectName(name), [name]);
  const palette = useMemo(() => pickNamePalette(name), [name]);
  const fontSize = useMemo(() => {
    if (name.length >= 24) {
      return 0.4;
    }

    if (name.length >= 16) {
      return 0.5;
    }

    return 0.65;
  }, [name.length]);

  useFrame((state, delta) => {
    if (!groupRef.current || !isActive || isReducedMotion) {
      return;
    }

    const spinBoost = isHovered ? 1.65 : 1;
    groupRef.current.rotation.y += delta * 0.6 * spinBoost;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.75) * 0.14;
  });

  return (
    <group ref={groupRef}>
      <Text
        position={[0.05, -0.05, -0.08]}
        color={palette.depth}
        fontSize={fontSize}
        lineHeight={0.92}
        maxWidth={4.4}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, 0.05, 0]}
        color={palette.main}
        outlineColor={palette.edge}
        outlineWidth={0.026}
        fontSize={fontSize}
        letterSpacing={0.015}
        lineHeight={0.92}
        maxWidth={4.4}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function ProjectScene({ name, isActive, isHovered, isReducedMotion }) {
  const [supportsWebGL, setSupportsWebGL] = useState(true);
  const cameraPosition = useMemo(() => [0, 0.05, 4], []);

  useEffect(() => {
    setSupportsWebGL(canUseWebGL());
  }, []);

  if (!supportsWebGL) {
    return (
      <div className="project-3d-scene-fallback">
        <span>{name}</span>
      </div>
    );
  }

  return (
    <Canvas
      className="project-3d-canvas"
      camera={{ fov: 32, position: cameraPosition }}
      dpr={[1, 1.5]}
      frameloop={isActive && !isReducedMotion ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight color="#ffd8b8" intensity={1.12} position={[2, 2.4, 1.6]} />
      <pointLight color="#8a563a" intensity={0.72} position={[-1.8, -0.3, 2.1]} />
      <pointLight color="#ffffff" intensity={isHovered ? 0.8 : 0.45} position={[0, 1.2, 2.4]} />
      <Float
        speed={isActive && !isReducedMotion ? 1 : 0}
        floatIntensity={isActive && !isReducedMotion ? 0.2 : 0}
        rotationIntensity={isHovered && !isReducedMotion ? 0.25 : 0}
      >
        <ProjectNameMesh
          name={name}
          isActive={isActive}
          isHovered={isHovered}
          isReducedMotion={isReducedMotion}
        />
      </Float>
    </Canvas>
  );
}

export default ProjectScene;
