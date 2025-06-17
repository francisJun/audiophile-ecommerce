"use client"

import Image, { ImageProps } from "next/image"
import { useEffect, useState } from 'react';

type ResponsiveImageBaseProps = Omit<ImageProps, 'src' | 'width' | 'height' | 'fill'> & {
  sources: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  sizes?: string;
};

type ResponsiveImageWithFill = ResponsiveImageBaseProps & {
  fill: true;
  width?: never;
  height?: never;
};

type ResponsiveImageWithDimensions = ResponsiveImageBaseProps & {
  fill?: false;
  width: number;
  height: number;
};

type ResponsiveImageProps = ResponsiveImageWithFill | ResponsiveImageWithDimensions;

export function ResponsiveImage({ 
  sources, 
  alt, 
  className = '', 
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ...props 
}: ResponsiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(sources.mobile);

  useEffect(() => {
    const updateImageSource = () => {
      if (window.innerWidth >= 1024) {
        setCurrentSrc(sources.desktop);
      } else if (window.innerWidth >= 768) {
        setCurrentSrc(sources.tablet);
      } else {
        setCurrentSrc(sources.mobile);
      }
    };

    // Set initial image
    updateImageSource();

    // Add event listener for window resize
    window.addEventListener('resize', updateImageSource);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updateImageSource);
  }, [sources]);

  // If fill is true, we don't pass width/height
  if ('fill' in props && props.fill === true) {
    const { width, height, alt: _, fill: __, ...restProps } = props as ResponsiveImageWithFill;
    return (
      <Image
        src={currentSrc}
        alt={alt}
        className={className}
        fill
        sizes={sizes}
        {...restProps}
      />
    );
  }

  // Otherwise, we use width/height
  const { width, height, fill, alt: _, ...restProps } = props as ResponsiveImageWithDimensions;
  return (
    <Image
      src={currentSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      {...restProps}
    />
  );
}
