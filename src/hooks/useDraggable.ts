import { useState, useRef, useEffect, useCallback } from 'react';

type Point = { x: number; y: number };

const getClientPoint = (e: MouseEvent | TouchEvent): Point => {
  if ('touches' in e && e.touches?.length) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if ('changedTouches' in e && e.changedTouches?.length) {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  const me = e as MouseEvent;
  return { x: me.clientX, y: me.clientY };
};

const useDraggable = (initialPosition: Point = { x: 100, y: 100 }) => {
  const [position, setPosition] = useState<Point>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dragStart = useRef<Point>({ x: 0, y: 0 });

  const startDrag = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  }, [position]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.window-header')) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  }, [startDrag]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.window-header')) return;
    const touch = e.touches[0];
    if (touch) startDrag(touch.clientX, touch.clientY);
  }, [startDrag]);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const { x, y } = getClientPoint(e);
    setPosition({ x: x - dragStart.current.x, y: y - dragStart.current.y });
  }, [isDragging]);

  const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e), [handleMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => {
    handleMove(e);
    e.preventDefault();
  }, [handleMove]);

  const handleEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleMouseDown, handleTouchStart]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${position.x}px`;
      ref.current.style.top = `${position.y}px`;
    }
  }, [position]);

  return { ref, isDragging };
};

export default useDraggable;