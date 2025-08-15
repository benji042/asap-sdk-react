import React, { useEffect, useRef } from "react";

const Logo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 64;
    canvas.height = 64;

    // Animation variables
    let animationFrameId: number;
    let rotation = 0;
    let hue = 210; // Start with blue
    let pulseSize = 0;
    let pulseDirection = 1;

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update animation variables
      rotation += 0.03; // Faster rotation for ASAP concept
      hue = 210 + Math.sin(rotation * 2) * 10; // Slight color shift
      pulseSize += 0.1 * pulseDirection; // Faster pulse for ASAP concept
      if (pulseSize > 1.2 || pulseSize < 0) {
        pulseDirection *= -1;
      }

      // Center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw speed particles (representing "As Soon As Possible")
      for (let i = 0; i < 12; i++) {
        const angle = rotation * 3 + (i * Math.PI * 2) / 12;
        const distance = 22 + Math.sin(rotation * 5 + i) * 6;

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        const particleSize = 1.5 + Math.sin(rotation * 3 + i) * 0.5;

        ctx.fillStyle = `hsla(${(hue + i * 15) % 360}, 100%, 70%, 0.8)`;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();

        // Add speed trail
        for (let j = 1; j <= 3; j++) {
          const trailAngle = angle - j * 0.2;
          const trailDist = distance - j * 2;
          const trailX = centerX + Math.cos(trailAngle) * trailDist;
          const trailY = centerY + Math.sin(trailAngle) * trailDist;
          const opacity = 0.5 - j * 0.15;

          ctx.fillStyle = `hsla(${
            (hue + i * 15) % 360
          }, 100%, 70%, ${opacity})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, particleSize * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw outer circle glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        18,
        centerX,
        centerY,
        32
      );
      gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.8)`);
      gradient.addColorStop(1, `hsla(${hue}, 100%, 70%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.fill();

      // Draw main circle
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fill();

      // Draw pulse effect (representing speed/ASAP)
      ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${1 - pulseSize / 1.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24 + pulseSize * 12, 0, Math.PI * 2);
      ctx.stroke();

      // Draw A letter
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("A", centerX, centerY + 2);

      // Draw clock hands to represent "ASAP" (time concept)
      // Fast second hand
      const secondHandAngle = rotation * 8; // Very fast
      const secondHandLength = 20;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(secondHandAngle) * secondHandLength,
        centerY + Math.sin(secondHandAngle) * secondHandLength
      );
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.stroke();

      // Minute hand
      const minuteHandAngle = rotation * 1.5; // Slower
      const minuteHandLength = 16;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(minuteHandAngle) * minuteHandLength,
        centerY + Math.sin(minuteHandAngle) * minuteHandLength
      );
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.stroke();

      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-10 h-10 rounded-lg"
      style={{ width: "40px", height: "40px" }}
      title="ASAP - As Soon As Possible"
    />
  );
};

export default Logo;
