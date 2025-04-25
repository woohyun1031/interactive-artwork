import  { useState, useEffect } from 'react';

type Box = { id: number; x: number; y: number; w: number; h: number; color: string };

export default function SpreadBoxes() {
    const [spread, setSpread] = useState(0);
    const [boxes, setBoxes] = useState<Box[]>([]);

    useEffect(() => {
        const newBoxes: Box[] = [];
        for (let i = 0; i < 12; i++) {
            const w = 80, h = 80;
            const x = Math.random() * 500 + 100;
            const y = Math.random() * 300 + 100;
            const color = `hsl(${Math.random() * 360}, 70%, 70%)`;
            console.log(x, y)
            newBoxes.push({ id: i, x, y, w, h, color });
        }
        setBoxes(newBoxes);
    }, []);

    const centerX = 400;
    const centerY = 300;

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#eee', position: 'relative' }}>
            <input
                type='range'
                min='0'
                max='3'
                step='0.01'
                value={spread}
                onChange={e => setSpread(parseFloat(e.target.value))}
                style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}
            />
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
        </div>
    );
}
