import { useState, useRef, useEffect, useCallback } from 'react';

type Point = { x: number; y: number };

const useDraggable = (initialPosition: Point = { x: 100, y: 100 }) => {
  const [position, setPosition] = useState<Point>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<Point>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Only start drag if clicking on the header
    if (!target.closest('.window-header')) return;

    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousedown', handleMouseDown);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseDown]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${position.x}px`;
      ref.current.style.top = `${position.y}px`;
    }
  }, [position]);

  return { ref, isDragging };
};

export default useDraggable;