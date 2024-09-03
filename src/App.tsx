import React, { useRef, useState, useEffect, useMemo, forwardRef, memo, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { cubeData } from './CountryCube';//, cubeDataAmerica, cubeDataWest } from './CountyCube';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

interface VideoInfo {
  videoId: string;
}

interface VideoContextType {
  videoInfo: VideoInfo[] | null;
  setVideoInfo: React.Dispatch<React.SetStateAction<VideoInfo[] | null>>;
}

interface DiamondProps {
  position: THREE.Vector3;
  name: string;
  id: string;
  tag?: string;
  currentTag?: string;
  videoCategoryId: number;
}

interface CubeData {
  id: string;
  position: THREE.Vector3;
  ename: string;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo[] | null>(null);

  return (
    <VideoContext.Provider value={{ videoInfo, setVideoInfo }}>
      {children}
    </VideoContext.Provider>
  );
};

const VideoModal: React.FC = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  const { videoInfo, setVideoInfo } = context;
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setVideoInfo(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && overlayRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    if (videoInfo) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [videoInfo, setVideoInfo]);

  if (!videoInfo) {
    return null;
  }

  const videoUrl = `https://www.youtube.com/embed/${videoInfo[0].videoId}`;
  console.log(videoInfo[0].videoId);

  return (
    <div ref={overlayRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div ref={modalRef} style={{ position: 'relative' }}>
        <iframe
          src={videoUrl}
          width="640"
          height="360"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const Earth: React.FC<{ cubeData: CubeData[] }> = ({ cubeData }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('./Albedo.jpg');
  const diamondRefs = useRef(new Map<string, THREE.Object3D>());

  return (
    <mesh ref={earthRef} geometry={new THREE.SphereGeometry(1, 64, 64)}>
      <meshStandardMaterial map={earthTexture} />
      {cubeData.map((data) => (
        <Diamond
          key={data.id}
          position={data.position}
          name={data.ename}
          id={data.id}
          videoCategoryId={10}
          ref={(ref: THREE.Object3D | null) => {
            if (ref) diamondRefs.current.set(data.ename, ref);
          }}
        />
      ))}
    </mesh>
  );
};

const Atmosphere: React.FC = () => {
  return (
    <mesh geometry={new THREE.SphereGeometry(1.02, 64, 64)}>
      <shaderMaterial
        side={THREE.FrontSide}
        transparent
        uniforms={{ color: { value: new THREE.Color(0x0099ff) } }}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          varying vec3 vNormal;
          void main() {
            float intensity = 1.05 - dot(vNormal, vec3(0.0, 0.0, 1.0));
            vec3 atmosphereColor = color * intensity;
            gl_FragColor = vec4(atmosphereColor, intensity);
          }
        `}
      />
    </mesh>
  );
};

function getGeometryPosition(geometry: THREE.BufferGeometry): Float32Array {
  const numParticles = 10000;
  const sampler = new MeshSurfaceSampler(new THREE.Mesh(geometry)).build();

  const particlesPosition = new Float32Array(numParticles * 3);
  for (let i = 0; i < numParticles; i++) {
    const newPosition = new THREE.Vector3();
    sampler.sample(newPosition);
    particlesPosition.set([newPosition.x, newPosition.y, newPosition.z], i * 3);
  }
  return particlesPosition;
}

const Diamond = React.memo(forwardRef<THREE.Group, DiamondProps>(({ position, name, id, tag, currentTag, videoCategoryId }, ref) => {
  const { scene } = useThree();
  const { camera } = useThree();

  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [conePosition, setConePosition] = useState(new THREE.Vector3());

  const pyramid1Ref = useRef<THREE.Mesh>(null);
  const pyramid2Ref = useRef<THREE.Mesh>(null);

  const [material1, setMaterial1] = useState(() => new THREE.MeshStandardMaterial());
  const [material2, setMaterial2] = useState(() => new THREE.MeshStandardMaterial());

  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("Diamond must be used within a VideoProvider");
  }
  const { setVideoInfo } = context;

  useFrame(() => {
    const time = Date.now() * 0.002;
    const color = (time % 2 < 1) ? new THREE.Color(0x0000ff) : new THREE.Color(0xff0000);
    setMaterial1(prev => {
      prev.color.set(color);
      return prev;
    });
    setMaterial2(prev => {
      prev.color.set(color);
      return prev;
    });
  });

  const earthRadius = 1;
  const diamondOffset = 0.02;
  const adjustedPosition = position.normalize().multiplyScalar(earthRadius + diamondOffset);

  const pitch = Math.asin(adjustedPosition.y / adjustedPosition.length());
  const yaw = Math.atan2(-adjustedPosition.x, -adjustedPosition.z);

  const handleClick = async (event: ThreeEvent<MouseEvent>) => {
    if (pyramid1Ref.current) {
      const conePosition = pyramid1Ref.current.position;
      event.stopPropagation();
      setConePosition(pyramid1Ref.current.position);
      console.log(conePosition);
      console.log(id);
      try {
        const response = await fetch(`http://localhost:3000/api/videos?regionCode=${id}&videoCategoryId=${videoCategoryId}`);
        const videos: VideoInfo[] = await response.json();
        console.log(videos);
        setVideos(videos);
        setVideoInfo(videos);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTouch = async (event: ThreeEvent<TouchEvent>) => {
    if (pyramid1Ref.current) {
      const conePosition = pyramid1Ref.current.position;
      event.stopPropagation();
      setConePosition(pyramid1Ref.current.position);
      console.log(conePosition);
      console.log(id);
      try {
        const response = await fetch(`http://localhost:3000/api/videos?regionCode=${id}&videoCategoryId=${videoCategoryId}`);
        const videos: VideoInfo[] = await response.json();
        console.log(videos);
        setVideos(videos);
        setVideoInfo(videos);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <group ref={ref} position={adjustedPosition} rotation={[pitch, yaw, 0]}  >
      <mesh ref={pyramid1Ref} onClick={handleClick}> {/*onTouchStart={handleTouch}>*/}
        <coneGeometry args={[1 / 108, 1 / 54, 16]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={pyramid2Ref} rotation={[Math.PI, 0, 0]} position={[0, -1 / 54, 0]}>
        <coneGeometry args={[1 / 108, 1 / 54, 16]} />
        <meshStandardMaterial />
      </mesh>
      <Text
        position={[0, 0.001, -0.02]}
        scale={[-1, 1, 0.5]}
        fontSize={0.02}
        color="white"
      >
        {name}
      </Text>
    </group>
  );
}));

const App: React.FC = () => {
  return (
    <VideoProvider>
      <Canvas style={{
        backgroundColor: 'black',
        width: '100%',
        height: '100vh',
        position: 'absolute', // 絶対位置指定
        top: 0,
        left: 0
      }} >
        <ambientLight intensity={5} />
        <pointLight position={[0, 0, 3]} />
        <Atmosphere />
        <Earth cubeData={cubeData} />
        <OrbitControls enablePan={false} />
        <Html>
          <div id="video-container"></div>
        </Html>
      </Canvas>
      <VideoModal />
    </VideoProvider>
  );
};

export default App;
