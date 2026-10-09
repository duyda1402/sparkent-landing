import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Spark Entertainment Asset',
  className = '',
  fallbackLabel,
  fetchPriority,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Use authentic Spark dark background without textual placeholder cards
  if (error || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-[#0A0C14] ${className}`}
        aria-label={fallbackLabel || alt}
      >
        <img
          src="https://cdn.wegic.ai/assets/onepage/agent/images/1782597064344_0.jpg?imageMogr2/format/webp"
          alt={alt}
          fetchPriority={fetchPriority}
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        fetchPriority={fetchPriority}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-[#0A0C14] pointer-events-none" />
      )}
    </div>
  );
};
