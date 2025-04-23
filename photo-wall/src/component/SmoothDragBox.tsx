import React, { useRef, useState } from 'react';

export default function SmoothDragBox() {
    const [pos, setPos] = useState({ x: 100, y: 100 });
    const [isDragging, setDragging] = useState(false);
    const [spread, setSpread] = useState(0); // 퍼짐 정도 (0 ~ 3 등)
    const dragStart = useRef({ x: 0, y: 0 });
    const offsetStart = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        offsetStart.current = { ...pos };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const dragFactor = spread > 0 ? 0.4 : 1; // 퍼짐이 클수록 덜 움직이게
        setPos({
            x: offsetStart.current.x + dx * dragFactor,
            y: offsetStart.current.y + dy * dragFactor,
        });
    };

    const handleMouseUp = () => setDragging(false);

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ width: '100vw', height: '100vh', background: '#f9f9f9' }}
        >
            <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={spread}
                onChange={(e) => setSpread(parseFloat(e.target.value))}
                style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}
            />
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: '100px',
                    height: '100px',
                    background: 'hotpink',
                    borderRadius: '10px',
                    cursor: 'grab',
                    userSelect: 'none',
                    transition: isDragging ? 'none' : 'left 0.3s ease, top 0.3s ease',
                }}
            >
                드래그 & 슬라이더
            </div>
        </div>
    );
}
