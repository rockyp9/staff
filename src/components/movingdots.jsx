import React, { useRef, useEffect } from 'react';

const MovingDots = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;
        const speedMultiplier = props.header ? 1 : 0.1
        const dots = [];
        const dotCount = 100;

        // Initialize dots
        for (let i = 0; i < dotCount; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2 * speedMultiplier,
                speedY: (Math.random() - 0.5) * 2 * speedMultiplier,
                color: 'white',
            });
        }

        const drawDots = () => {
            ctx.clearRect(0, 0, width, height);

            dots.forEach(dot => {
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = dot.color;
                ctx.fill();

                // Update dot position
                dot.x += dot.speedX;
                dot.y += dot.speedY;

                // Bounce dots off the edges
                if (dot.x < 0 || dot.x > width) dot.speedX *= -1;
                if (dot.y < 0 || dot.y > height) dot.speedY *= -1;
            });

            requestAnimationFrame(drawDots);
        };

        drawDots();

        return () => {
            cancelAnimationFrame(drawDots);
        };
    }, []);



    return (
        <canvas ref={canvasRef} style={props.header ? ({ position: 'absolute', width: '100%', height: '100px', left: 0, top: -20 }) : { position: 'fixed', background: 'black', zIndex: -1 }} />
    );
};

export default MovingDots;