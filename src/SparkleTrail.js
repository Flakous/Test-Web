import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);

  const handleMouseMove = (e) => {
    const sparkle = {
      id: Math.random(), // Unique ID for each sparkle
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 10 + 5, // Random size for variation
      duration: Math.random() * 1 + 0.5, // Random animation duration
    };

    setSparkles((prev) => [...prev, sparkle]);

    // Remove the sparkle after animation
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
    }, sparkle.duration * 1000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: sparkle.duration, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: sparkle.y,
            left: sparkle.x,
            width: sparkle.size,
            height: sparkle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, #FFD700, transparent)`,
            pointerEvents: "none", // Prevent it from interfering with mouse events
          }}
        />
      ))}
    </div>
  );
}

export default SparkleTrail;
