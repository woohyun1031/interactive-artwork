import React, { useState, useEffect } from 'react';

type Box = { id: number; x: number; y: number; w: number; h: number; color: string };

export default function ScrollSpreadBoxes() {
    const [spread, setSpread] = useState(0);
    const [boxes, setBoxes] = useState<Box[]>([]);

    useEffect(() => {
        const newBoxes: Box[] = [];
        for (let i = 0; i < 15; i++) {
            const w = 80, h = 80;
            const x = Math.random() * 500 + 100;
            const y = Math.random() * 300 + 100;
            const color = `hsl(${Math.random() * 360}, 70%, 70%)`;
            newBoxes.push({ id: i, x, y, w, h, color });
        }
        setBoxes(newBoxes);
    }, []);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY / 300; // 휠 속도 조절
        setSpread(s => Math.min(Math.max(s + delta, 0), 2)); // clamp between 0 and 2
    };

    const centerX = 400;
    const centerY = 300;

    return (
        <div
            onWheel={handleWheel}
            style={{ width: '100vw', height: '100vh', background: '#eee', position: 'relative' }}
        >
            {boxes.map(box => {
                const boxCenterX = box.x + box.w / 2;
                const boxCenterY = box.y + box.h / 2;
                const dx = boxCenterX - centerX;
                const dy = boxCenterY - centerY;
                const xPos = centerX + dx * spread - box.w / 2;
                const yPos = centerY + dy * spread - box.h / 2;

                return (
                    <div
                        key={box.id}
                        style={{
                            position: 'absolute',
                            width: `${box.w}px`,
                            height: `${box.h}px`,
                            left: `${xPos}px`,
                            top: `${yPos}px`,
                            background: box.color,
                            borderRadius: '8px',
                            transition: 'left 0.3s ease, top 0.3s ease',
                        }}
                    />
                );
            })}
            <div
                onWheel={handleWheel}
                style={{
                    width: '100vw', height: '100vh',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '4rem', background: '#f2f2f2'
                }}
            >
                {spread}
            </div>
        </div>
    );
}
