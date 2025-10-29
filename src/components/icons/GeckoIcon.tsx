import React from 'react';
import Image from 'next/image';

interface GeckoIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const GeckoIcon = ({ className, style }: GeckoIconProps) => (
  <Image
    src="/images/largatixa.png"
    alt="Curiosidade"
    width={28}
    height={28}
    className={`${className} filter grayscale invert`}
    style={style}
  />
);