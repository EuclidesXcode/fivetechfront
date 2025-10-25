'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean;
  let lastFunc: NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func.apply(this, args);
      }, limit);
    }
  } as T;
}

export default function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const connectionsRef = useRef<any[]>([]);
  const dataParticlesRef = useRef<THREE.Mesh[]>([]);
  const pointsRef = useRef<THREE.Mesh[]>([]);
  
  const zoomTargetRef = useRef<THREE.Vector3 | null>(null);
  const isZoomingInRef = useRef(false);
  const isZoomingOutRef = useRef(false);
  const originalCameraPosition = useRef(new THREE.Vector3(0, 0, 40));
  const focusedNeuronRef = useRef<THREE.Mesh | null>(null);
  
  const spawnThresholdRef = useRef(100);

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(originalCameraPosition.current);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --- Fade Plane for Trail Effect (now parented to camera) ---
    const fadeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 });
    const fadePlane = new THREE.PlaneGeometry(1, 1);
    const fadeMesh = new THREE.Mesh(fadePlane, fadeMaterial);
    fadeMesh.position.z = -1; // Position it just in front of the camera's near plane
    camera.add(fadeMesh); // Add it as a child of the camera

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.4 });

    const spawnNeuron = (position: THREE.Vector3) => {
      const mesh = new THREE.Mesh(geometry, nodeMaterial.clone());
      mesh.position.copy(position);
      mesh.userData = { baseOpacity: 0.4, dataReceived: 0 };
      pointsRef.current.push(mesh);
      networkGroup.add(mesh);
      return mesh;
    };

    for (let i = 0; i < 40; i++) {
      const radius = 100;
      const theta = THREE.MathUtils.randFloatSpread(360) * Math.PI / 180;
      const phi = THREE.MathUtils.randFloatSpread(360) * Math.PI / 180;
      const position = new THREE.Vector3(radius * Math.sin(theta) * Math.cos(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(theta));
      spawnNeuron(position);
    }

    const updateNetwork = () => {
      connectionsRef.current.forEach(conn => networkGroup.remove(conn.line));
      dataParticlesRef.current.forEach(p => networkGroup.remove(p));
      connectionsRef.current = [];
      dataParticlesRef.current = [];
      const dataParticleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
      const dataParticleMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.8 });
      const connectionDistance = 100;
      pointsRef.current.forEach((point, i) => {
        pointsRef.current.slice(i + 1).forEach(otherPoint => {
          if (point.position.distanceTo(otherPoint.position) < connectionDistance) {
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.15 });
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([point.position, otherPoint.position]);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            networkGroup.add(line);
            connectionsRef.current.push({ line, start: point, end: otherPoint, progress: Math.random() });
            const particle = new THREE.Mesh(dataParticleGeometry, dataParticleMaterial.clone());
            networkGroup.add(particle);
            dataParticlesRef.current.push(particle);
          }
        });
      });
    };

    updateNetwork();

    let currentRotation = 0;
    const handleScroll = () => {
      if (isZoomingInRef.current || isZoomingOutRef.current) return;
      const scrollY = window.scrollY || 0;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      currentRotation = scrollPercent * Math.PI * 2;
    };

    const handleZoomInRequest = () => {
      if (pointsRef.current.length > 0) {
        const randomIndex = Math.floor(Math.random() * pointsRef.current.length);
        const randomNeuron = pointsRef.current[randomIndex];
        focusedNeuronRef.current = randomNeuron;
        (randomNeuron.material as THREE.MeshBasicMaterial).color.set(0xffffff);
        randomNeuron.scale.set(2, 2, 2);
        zoomTargetRef.current = randomNeuron.position.clone().add(new THREE.Vector3(0, 0, 2));
        isZoomingInRef.current = true;
        isZoomingOutRef.current = false;
      }
    };

    const handleZoomOutRequest = () => {
      if (focusedNeuronRef.current) {
        (focusedNeuronRef.current.material as THREE.MeshBasicMaterial).color.set(0x00ffff);
        focusedNeuronRef.current.scale.set(1, 1, 1);
        focusedNeuronRef.current = null;
      }
      isZoomingOutRef.current = true;
      isZoomingInRef.current = false;
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.clearDepth();

      if (isZoomingInRef.current && zoomTargetRef.current) {
        const targetNeuronPos = zoomTargetRef.current.clone().sub(new THREE.Vector3(0, 0, 2));
        camera.position.lerp(zoomTargetRef.current, 0.05);
        camera.lookAt(targetNeuronPos);
        if (camera.position.distanceTo(zoomTargetRef.current) < 0.1) {
          isZoomingInRef.current = false;
        }
      } else if (isZoomingOutRef.current) {
        camera.position.lerp(originalCameraPosition.current, 0.05);
        camera.lookAt(0, 0, 0);
        if (camera.position.distanceTo(originalCameraPosition.current) < 0.1) {
          isZoomingOutRef.current = false;
        }
      } else {
        networkGroup.rotation.y += (currentRotation - networkGroup.rotation.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }

      connectionsRef.current.forEach((connection, index) => {
        connection.progress += 0.01;
        if (connection.progress > 1) {
          connection.progress = 0;
          const endPoint = connection.end;
          endPoint.userData.dataReceived = (endPoint.userData.dataReceived || 0) + 1;

          if (endPoint.userData.dataReceived >= spawnThresholdRef.current) {
            endPoint.userData.dataReceived = 0;
            
            const MAX_NEURONS = 100;
            if (pointsRef.current.length >= MAX_NEURONS) {
              const oldestNeuron = pointsRef.current.shift();
              if (oldestNeuron) {
                networkGroup.remove(oldestNeuron);
                oldestNeuron.geometry.dispose();
                (oldestNeuron.material as THREE.Material).dispose();
              }
            }

            const newPosition = new THREE.Vector3().copy(endPoint.position).add(new THREE.Vector3().randomDirection().multiplyScalar(15));
            spawnNeuron(newPosition);
            updateNetwork();

            spawnThresholdRef.current += 50;
          }

          const material = endPoint.material as THREE.MeshBasicMaterial;
          material.opacity = 0.9;
          const fadeOut = () => {
            material.opacity *= 0.95;
            if (material.opacity > endPoint.userData.baseOpacity) requestAnimationFrame(fadeOut);
          };
          fadeOut();
        }
        const particle = dataParticlesRef.current[index];
        if (particle) {
          const pos = new THREE.Vector3().lerpVectors(connection.start.position, connection.end.position, connection.progress);
          particle.position.copy(pos);
        }
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Scale the fade plane to cover the screen. It's a child of the camera.
      const distance = Math.abs(fadeMesh.position.z);
      const vFov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFov / 2) * distance;
      const width = height * camera.aspect;
      fadeMesh.scale.set(width, height, 1);
    };
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('zoomToRandomNeuron', handleZoomInRequest);
    window.addEventListener('zoomOut', handleZoomOutRequest);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('zoomToRandomNeuron', handleZoomInRequest);
      window.removeEventListener('zoomOut', handleZoomOutRequest);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-0 opacity-50"
    />
  );
}