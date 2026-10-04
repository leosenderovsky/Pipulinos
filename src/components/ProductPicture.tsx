import React, { useState } from 'react';

interface ProductPictureProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  pictureClassName: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'auto' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const ProductPicture: React.FC<ProductPictureProps> = ({
  src,
  alt,
  width,
  height,
  className,
  pictureClassName,
  loading,
  decoding,
  fetchPriority,
}) => {
  const [useWebp, setUseWebp] = useState(true);

  return (
    <picture className={pictureClassName}>
      {useWebp && <source srcSet={src.replace(/\.jpg$/i, '.webp')} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onError={() => setUseWebp(false)}
      />
    </picture>
  );
};
