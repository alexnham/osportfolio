import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './PinnedPhotos.css';

// Add your photos to /public/photos/ — 1.jpg through 10.jpg
const photoConfigs = [
  { src: '/photos/1.jpg', fallback: 'https://picsum.photos/seed/pin1/120/150' },
  { src: '/photos/2.jpg', fallback: 'https://picsum.photos/seed/pin2/120/150' },
  { src: '/photos/3.jpg', fallback: 'https://picsum.photos/seed/pin3/120/150' },
  { src: '/photos/4.jpg', fallback: 'https://picsum.photos/seed/pin4/120/150' },
  { src: '/photos/5.jpg', fallback: 'https://picsum.photos/seed/pin5/120/150' },
  { src: '/photos/6.jpg', fallback: 'https://picsum.photos/seed/pin6/120/150' },
  { src: '/photos/7.jpg', fallback: 'https://picsum.photos/seed/pin7/120/150' },
  { src: '/photos/8.jpg', fallback: 'https://picsum.photos/seed/pin8/120/150' },
  { src: '/photos/9.jpg', fallback: 'https://picsum.photos/seed/pin9/120/150' },
  { src: '/photos/10.jpg', fallback: 'https://picsum.photos/seed/pin10/120/150' },
];

const POLAROID_W = 120;
const POLAROID_H = 155;
const MIN_GAP = 24;
const MAX_ATTEMPTS = 200;

function generateScatteredLayout(count: number) {
  const positions: Array<{ top: number; left: number; rotate: number }> = [];

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let top: number, left: number;

    do {
      top = 5 + Math.random() * 70;
      left = 4 + Math.random() * 72;
      const rotate = -10 + Math.random() * 20;

      const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
      const overlaps = positions.some((p) => {
        const dx = Math.abs((left - p.left) * w / 100);
        const dy = Math.abs((top - p.top) * h / 100);
        return dx < POLAROID_W + MIN_GAP && dy < POLAROID_H + MIN_GAP;
      });

      if (!overlaps || attempts++ > MAX_ATTEMPTS) {
        positions.push({ top, left, rotate });
        break;
      }
    } while (attempts < MAX_ATTEMPTS);
  }

  return positions;
}

const PinnedPhotos: React.FC = () => {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const photos = useMemo(() => {
    const layout = generateScatteredLayout(photoConfigs.length);
    return photoConfigs.map((config, i) => ({
      ...config,
      ...layout[i],
    }));
  }, []);

  const zoomedPhoto = zoomedIndex !== null ? photos[zoomedIndex] : null;

  return (
    <>
      <div className="pinned-photos">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`polaroid ${zoomedIndex === i ? 'polaroid--zoomed-inline' : ''}`}
            style={{
              '--r': `${photo.rotate}deg`,
              top: `${photo.top}%`,
              left: `${photo.left}%`,
              transform: `rotate(${photo.rotate}deg)`,
            } as React.CSSProperties}
            onClick={(e) => {
              e.stopPropagation();
              setZoomedIndex(i);
            }}
          >
            <div className="polaroid__pin" />
            <div className="polaroid__inner">
              <img
                src={photo.src}
                alt=""
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  if (el.src !== photo.fallback) el.src = photo.fallback;
                }}
              />
              <div className="polaroid__tape" />
            </div>
          </div>
        ))}
      </div>
      {zoomedPhoto &&
        createPortal(
          <div
            className="polaroid-backdrop"
            onClick={() => setZoomedIndex(null)}
            aria-hidden="true"
          >
            <div
              className="polaroid polaroid--zoomed"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="polaroid__pin" />
              <div className="polaroid__inner">
                <img
                  src={zoomedPhoto.src}
                  alt=""
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    if (el.src !== zoomedPhoto.fallback) el.src = zoomedPhoto.fallback;
                  }}
                />
                <div className="polaroid__tape" />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default PinnedPhotos;
