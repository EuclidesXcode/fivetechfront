"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Criar grupo para conter todos os elementos
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Criar pontos (neurônios) - agora usando esferas menores
    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    const points: THREE.Mesh[] = [];
    const connections: { line: THREE.Line; start: THREE.Mesh; end: THREE.Mesh; progress: number }[] = [];

    // Material para os pontos com glow effect
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.4,
    });

    // Criar pontos em uma distribuição mais esférica
    for (let i = 0; i < 200; i++) {
      const mesh = new THREE.Mesh(geometry, nodeMaterial.clone());
      const radius = 100;
      const theta = THREE.MathUtils.randFloatSpread(360) * Math.PI / 180;
      const phi = THREE.MathUtils.randFloatSpread(360) * Math.PI / 180;
      
      mesh.position.x = radius * Math.sin(theta) * Math.cos(phi);
      mesh.position.y = radius * Math.sin(theta) * Math.sin(phi);
      mesh.position.z = radius * Math.cos(theta);
      
      mesh.userData = { baseOpacity: 0.4 }; // Para animação de pulse
      points.push(mesh);
      networkGroup.add(mesh);
    }

    // Criar conexões entre pontos próximos
    points.forEach((point, i) => {
      points.slice(i + 1).forEach(otherPoint => {
        if (point.position.distanceTo(otherPoint.position) < 40) {
          const lineMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(0x00ffff),
            transparent: true,
            opacity: 0.15, // Linhas mais sutis
          });

          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            point.position,
            otherPoint.position,
          ]);

          const line = new THREE.Line(lineGeometry, lineMaterial);
          networkGroup.add(line);

          connections.push({
            line,
            start: point,
            end: otherPoint,
            progress: Math.random(), // Início aleatório
          });
        }
      });
    });

    // Posicionar câmera no centro
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);

    // Partículas de dados
    const dataParticleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const dataParticleMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.8,
    });

    const dataParticles = connections.map(() => {
      const particle = new THREE.Mesh(dataParticleGeometry, dataParticleMaterial.clone());
      networkGroup.add(particle);
      return particle;
    });

    // Handler de scroll
    let currentRotation = 0;
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const targetRotation = scrollPercent * Math.PI * 2; // Rotação completa
      currentRotation = targetRotation;
    };

    window.addEventListener('scroll', handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotação suave da rede
      networkGroup.rotation.y += (currentRotation - networkGroup.rotation.y) * 0.05;

      // Animar partículas e pulsos
      connections.forEach((connection, index) => {
        connection.progress += 0.01;
        if (connection.progress > 1) {
          connection.progress = 0;
          // Efeito de pulse no ponto de chegada
          const endPoint = connection.end;
          const material = endPoint.material as THREE.MeshBasicMaterial;
          material.opacity = 0.8;
          
          // Animação de fade
          const fadeOut = () => {
            material.opacity *= 0.95;
            if (material.opacity > endPoint.userData.baseOpacity) {
              requestAnimationFrame(fadeOut);
            }
          };
          fadeOut();
        }

        const particle = dataParticles[index];
        const pos = new THREE.Vector3().lerpVectors(
          connection.start.position,
          connection.end.position,
          connection.progress
        );
        particle.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Ajuste para responsividade
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-0 opacity-50"
    />
  );
}