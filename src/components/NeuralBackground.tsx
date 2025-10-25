'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Throttle utility (unchanged)
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

  useEffect(() => {
    if (!containerRef.current) return;

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const fadeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 });
    const fadePlane = new THREE.PlaneGeometry(1, 1);
    const fadeMesh = new THREE.Mesh(fadePlane, fadeMaterial);
    fadeMesh.renderOrder = -1;
    scene.add(fadeMesh);

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

    // Start with an initial set of points
    for (let i = 0; i < 40; i++) {
      const radius = 100;
      const theta = THREE.MathUtils.randFloatSpread(360) * Math.PI / 180;
      const phi = THREE.MathUtils.randFloatSpread(360) * Math.PI / 180;
      const position = new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta)
      );
      spawnNeuron(position);
    }

    camera.position.z = 0;
    camera.lookAt(0, 0, 0);

    const updateNetwork = () => {
      connectionsRef.current.forEach(conn => networkGroup.remove(conn.line));
      dataParticlesRef.current.forEach(p => networkGroup.remove(p));
      connectionsRef.current = [];
      dataParticlesRef.current = [];

      const dataParticleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
      const dataParticleMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, transparent: true, opacity: 0.8 });
      const connectionDistance = 70; // Fixed, mature connection distance

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

    updateNetwork(); // Initial network generation

    let currentRotation = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      currentRotation = scrollPercent * Math.PI * 2;
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.clearDepth();
      networkGroup.rotation.y += (currentRotation - networkGroup.rotation.y) * 0.05;

      connectionsRef.current.forEach((connection, index) => {
        connection.progress += 0.01;
        if (connection.progress > 1) {
          connection.progress = 0;
          const endPoint = connection.end;
          endPoint.userData.dataReceived = (endPoint.userData.dataReceived || 0) + 1;

          if (endPoint.userData.dataReceived >= 1000) {
            endPoint.userData.dataReceived = 0;

            // USER REQUEST: Performance - Cap and recycle neurons
            if (pointsRef.current.length >= 150) {
              const oldestNeuron = pointsRef.current.shift(); // 1. Dequeue the oldest
              if (oldestNeuron) {
                networkGroup.remove(oldestNeuron); // 2. Remove from scene
                oldestNeuron.geometry.dispose(); // 3. Dispose geometry
                (oldestNeuron.material as THREE.Material).dispose(); // 4. Dispose material
              }
            }

            const newPosition = new THREE.Vector3().copy(endPoint.position).add(new THREE.Vector3().randomDirection().multiplyScalar(15));
            spawnNeuron(newPosition);
            updateNetwork(); // Rebuild network with the new point
          }

          const material = endPoint.material as THREE.MeshBasicMaterial;
          material.opacity = 0.8;
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

    const handleResize = () => { /* ... unchanged ... */ };
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
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
