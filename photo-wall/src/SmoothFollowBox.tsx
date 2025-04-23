import { useRef, useEffect, useState } from 'react';

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export default function SmoothFollowBox() {
    const boxRef = useRef<HTMLDivElement>(null);
    const [target, setTarget] = useState({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let frame: number;
        const animate = () => {
            pos.current.x = lerp(pos.current.x, target.x, 0.1);
            pos.current.y = lerp(pos.current.y, target.y, 0.1);

            if (boxRef.current) {
                boxRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
            }

            frame = requestAnimationFrame(animate);
        };
        animate();

        return () => cancelAnimationFrame(frame);
    }, [target]);

    return (
        <div
            onMouseMove={(e) => {
                // 가운데 맞추기
                setTarget({ x: e.clientX - 50, y: e.clientY - 100 });
            }}
            style={{
                width: '100vw',
                height: '100vh',
                background: '#f9f9f9',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                ref={boxRef}
                style={{
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    background: 'hotpink',
                    borderRadius: '10px',
                    pointerEvents: 'none', // 마우스 통과
                }}
            />
        </div>
    );
}
