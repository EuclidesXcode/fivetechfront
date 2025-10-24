'use client';

import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';
import { useEffect } from 'react';

export function WebVitalsLogger() {
  useEffect(() => {
    // Função para logar as métricas de forma clara
    const logMetric = (metric: Metric) => {
      const body = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating, // 'good', 'needs-improvement', 'poor'
      };
      console.log(`[Core Web Vitals] ${body.name}:`, {
        value: `${Math.round(body.value * 100) / 100}ms`,
        rating: body.rating,
      });
    };

    // Registra os callbacks
    onCLS(logMetric);
    onLCP(logMetric);
    onINP(logMetric);

  }, []);

  return null; // O componente não renderiza nada na UI
}
