import React, {useRef, useState} from 'react';

export default function BasicDragBox() {
    const boxRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState(0);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const initialX = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        startX.current = e.clientX;
        initialX.current = x;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - startX.current;
        setX(initialX.current + dx);
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ height: '100vh', background: '#eee' }}
        >
            <div
                ref={boxRef}
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: '100px',
                    width: '100px',
                    height: '100px',
                    background: 'skyblue',
                    cursor: 'grab',
                    userSelect: 'none',
                    transition: isDragging.current ? 'none' : 'left 0.2s ease'
                }}
            >
                드래그 해봐
            </div>
        </div>
    );
}
