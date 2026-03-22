import React, { useMemo } from 'react';
import './Snow.css';

const FLAKE_COUNT = 60;

const Snow: React.FC = () => {
  const flakes = useMemo(() => Array.from({ length: FLAKE_COUNT }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 5,
    left: Math.random() * 100,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * -15,
  })), []);

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            animation: `snowFall ${flake.duration}s linear ${flake.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default Snow;
