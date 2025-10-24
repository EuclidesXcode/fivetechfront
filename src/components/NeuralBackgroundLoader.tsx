'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false is now inside a Client Component
const NeuralBackground = dynamic(
  () => import('./NeuralBackground'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-50 bg-gray-900" />
    ),
  }
);

export default function NeuralBackgroundLoader() {
  return <NeuralBackground />;
}
