import React, { useRef, useEffect } from 'react';

const DiagonalRainingCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;

        const raindrops = [];
        const raindropCount = 100;

        // Initialize raindrops
        for (let i = 0; i < raindropCount; i++) {
            raindrops.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 2 + 1,
                // Random color from light grey to white
                color: `hsl(0, 0%, ${Math.random() * 20 + 80}%)`,
            });
        }

        const drawRaindrops = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            raindrops.forEach(drop => {
                ctx.strokeStyle = drop.color;
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x - drop.length * 0.5, drop.y + drop.length);
                ctx.stroke();

                // Update raindrop position to move diagonally
                drop.x -= drop.speed * 0.5;
                drop.y += drop.speed;

                // Reset raindrop if it goes out of bounds
                if (drop.y > height || drop.x < 0) {
                    drop.y = -drop.length;
                    drop.x = Math.random() * width;
                    drop.color = `hsl(0, 0%, ${Math.random() * 20 + 80}%)`; // Reassign color on reset
                }
            });

            // Loop the animation
            requestAnimationFrame(drawRaindrops);
        };

        drawRaindrops();

        return () => {
            cancelAnimationFrame(drawRaindrops);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ display: 'block', position: 'fixed' }} />
    );
};

export default DiagonalRainingCanvas;