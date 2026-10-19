import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './PinnedPhotos.css';

// Vite discovers these at build time; add photos here and rebuild to publish them.
const photoFiles = import.meta.glob<string>(
  '/public/photos/**/*.{jpg,jpeg,png,webp,gif,avif,svg,JPG,JPEG,PNG,WEBP,GIF,AVIF,SVG}',
  { eager: true, query: '?url', import: 'default' }
);
const photoConfigs = Object.keys(photoFiles)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => ({ src: photoFiles[path] }));

const POLAROID_W = 120;
const POLAROID_H = 155;
const MIN_GAP = 24;
const MAX_ATTEMPTS = 200;

function generateScatteredLayout(count: number) {
  const positions: Array<{ top: number; left: number; rotate: number }> = [];

  for (let i = 0; i < count; i++) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const top = 5 + Math.random() * 70;
      const left = 4 + Math.random() * 72;
      const rotate = -10 + Math.random() * 20;

      const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
      const overlaps = positions.some((p) => {
        const dx = Math.abs((left - p.left) * w / 100);
        const dy = Math.abs((top - p.top) * h / 100);
        return dx < POLAROID_W + MIN_GAP && dy < POLAROID_H + MIN_GAP;
      });

      // Allow overlap when crowded so every photo still gets a position.
      if (!overlaps || attempt === MAX_ATTEMPTS - 1) {
        positions.push({ top, left, rotate });
        break;
      }
    }
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
            key={photo.src}
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
