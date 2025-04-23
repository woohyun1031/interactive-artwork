import React, { useRef, useState } from 'react';

export default function DraggableBox() {
    const [pos, setPos] = useState({ x: 100, y: 100 });  // 박스 위치
    const isDragging = useRef(false);                   // 드래그 중인지 여부
    const startMouse = useRef({ x: 0, y: 0 });           // 마우스 시작 위치
    const startPos = useRef({ x: 0, y: 0 });             // 박스 시작 위치

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startMouse.current = { x: e.clientX, y: e.clientY };
        startPos.current = { ...pos };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - startMouse.current.x;
        const dy = e.clientY - startMouse.current.y;
        setPos({
            x: startPos.current.x + dx,
            y: startPos.current.y + dy
        });
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ width: '100vw', height: '100vh', background: '#f3f3f3' }}
        >
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: '100px',
                    height: '100px',
                    background: 'skyblue',
                    borderRadius: '8px',
                    cursor: 'grab',
                    userSelect: 'none'
                }}
            >
                드래그 해봐
            </div>
        </div>
    );
}
