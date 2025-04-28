import { useState } from 'react';

type Box = { id: number; x: number; y: number; color: string };

export default function FocusBoxes() {
    const [focusedId, setFocusedId] = useState<number | null>(null);

    const boxes: Box[] = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 100 + i * 150,
        y: 200,
        color: `hsl(${i * 60}, 70%, 70%)`
    }));

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    return (
        <div
            onClick={() => setFocusedId(null)}
            style={{ width: '100vw', height: '100vh', background: '#f0f0f0', position: 'relative' }}
        >
            {boxes.map(box => {
                const isFocused = box.id === focusedId;

                return (
                    <div
                        key={box.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            setFocusedId(box.id);
                        }}
                        style={{
                            position: 'absolute',
                            width: isFocused ? '200px' : '80px',
                            height: isFocused ? '200px' : '80px',
                            left: isFocused ? `${centerX - 100}px` : `${box.x}px`,
                            top: isFocused ? `${centerY - 100}px` : `${box.y}px`,
                            background: box.color,
                            borderRadius: '12px',
                            transition: 'all 0.5s ease',
                            filter: focusedId !== null && !isFocused ? 'blur(3px) brightness(0.7)' : 'none',
                            zIndex: isFocused ? 100 : box.id,
                            pointerEvents: focusedId !== null && !isFocused ? 'none' : 'auto',
                            cursor: 'pointer'
                        }}
                    />
                );
            })}
        </div>
    );
}
