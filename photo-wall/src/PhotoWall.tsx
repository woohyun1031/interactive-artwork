import React, { useRef, useState, useEffect } from 'react';

// helper to check rectangle overlap
type Frame = { x: number; y: number; w: number; h: number; bg: string; id: number };
function isOverlap(a: Frame, b: Frame) {
    return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
}

export default function PhotoWall({ frameCount = 30, maxAttempts = 100, maxSpread = 4, dragFactor = 0.5 }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
    const [frames, setFrames] = useState<Frame[]>([]);
    const [spread, setSpread] = useState(0);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [focusedId, setFocusedId] = useState<number | null>(null);
    const dragStart = useRef({ x: 0, y: 0 });
    const offsetStart = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const { width: W, height: H } = container.getBoundingClientRect();
        setContainerSize({ w: W, h: H });
        const newFrames: Frame[] = [];
        for (let i = 0; i < frameCount; i++) {
            const w = Math.floor(Math.random() * 150) + 100;
            const h = Math.floor(Math.random() * 150) + 100;
            let x = 0, y = 0, attempt = 0;
            do {
                x = Math.floor(Math.random() * (W - w));
                y = Math.floor(Math.random() * (H - h));
                attempt++;
            } while (attempt < maxAttempts && newFrames.some(f => isOverlap(f, { x, y, w, h, bg: '', id: -1 })));
            const hue = Math.floor(Math.random() * 360);
            const bg = `hsl(${hue}, 60%, 80%)`;
            newFrames.push({ id: i, w, h, x, y, bg });
        }
        setFrames(newFrames);
    }, [frameCount, maxAttempts]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setFocusedId(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (spread === 0 && focusedId === null) {
            console.log('?')
            setOffset({ x: 0, y: 0 });
        }
    }, [spread, focusedId]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY / 300;
        setSpread(s => Math.min(Math.max(s + delta, 0), maxSpread));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        offsetStart.current = { ...offset };
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const factor = spread > 0 ? dragFactor : 1;
        setOffset({ x: offsetStart.current.x + dx * factor, y: offsetStart.current.y + dy * factor });
    };
    const handleMouseUp = () => setDragging(false);
    const handleBackdropClick = () => setFocusedId(null);

    const { w: W, h: H } = containerSize;

    const viewCenterX = W / 2;
    const viewCenterY = H / 2;
    const focalX = viewCenterX - offset.x;
    const focalY = viewCenterY - offset.y;

    const containerStyle: React.CSSProperties = {
        width: '100%', height: '80vh', overflow: 'hidden', position: 'relative',
        cursor: dragging ? 'grabbing' : 'grab', background: '#fafafa'
    };
    const framesWrapperStyle: React.CSSProperties = {
        position: 'absolute', top: 0, left: 0,
        transform: `translate(${offset.x}px,  ${offset.y}px)`,
        transition: dragging ? 'none' : 'transform 0.5s ease'
    };



    return (
        <div
            ref={containerRef}
            style={containerStyle}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div style={framesWrapperStyle}>
                {frames.map(f => {
                    const fCenterX = f.x + f.w / 2;
                    const fCenterY = f.y + f.h / 2;

                    const dx = fCenterX - focalX;
                    const dy = fCenterY - focalY;

                    const xPos = focalX + dx * spread - f.w / 2;
                    const yPos = focalY + dy * spread - f.h / 2;

                    const isFocused = f.id === focusedId;

                    return (
                        <div
                            key={f.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                setFocusedId(f.id);
                            }}
                            style={{
                                position: 'absolute',
                                width: isFocused ? `${f.w * 2}px` : `${f.w}px`,
                                height: isFocused ? `${f.h * 2}px` : `${f.h}px`,
                                left: isFocused ? `${ focalX - f.w}px` : `${xPos}px`,
                                top: isFocused ? `${  focalY - f.h}px` : `${yPos}px`,
                                background: f.bg,
                                border: '4px solid #fff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                borderRadius: '4px',
                                zIndex: isFocused ? 99999 : f.w * f.h,
                                transform: isFocused ? 'scale(1)' : 'scale(1)',
                                transition: 'all 0.4s ease',
                                filter: focusedId !== null && !isFocused ? 'blur(2px) brightness(0.8)' : 'none',
                                pointerEvents: focusedId !== null && !isFocused ? 'none' : 'auto'
                            }}
                            onMouseEnter={e => !isFocused && (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseLeave={e => !isFocused && (e.currentTarget.style.transform = 'scale(1)')}
                        />
                    );
                })}
            </div>
            {focusedId !== null && (
                <div
                    onClick={handleBackdropClick}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.1)',
                        zIndex: 9990
                    }}
                />
            )}
        </div>
    );
}