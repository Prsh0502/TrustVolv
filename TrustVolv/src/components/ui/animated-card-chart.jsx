"use client";

import React, { useState } from "react";
import "./animated-card-chart.css";

export function AnimatedCard({ className = "", ...props }) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={`animated-card ${className}`}
      {...props}
    />
  );
}

export function CardBody({ className = "", ...props }) {
  return <div className={`card-body ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }) {
  return <h3 className={`card-title ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }) {
  return <p className={`card-description ${className}`} {...props} />;
}

export function CardVisual({ className = "", ...props }) {
  return <div className={`card-visual ${className}`} {...props} />;
}

export function Visual3({
  mainColor = "#FF5E7A",
  secondaryColor = "#F59E0B",
  gridColor = "rgba(128, 128, 128, 0.15)",
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="visual-overlay-trigger"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          "--color": mainColor,
          "--secondary-color": secondaryColor,
        }}
      />

      <div className="visual-wrapper">
        <Layer4
          color={mainColor}
          secondaryColor={secondaryColor}
          hovered={hovered}
        />
        <Layer3 color={mainColor} />
        <Layer1 color={mainColor} secondaryColor={secondaryColor} />
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

function GridLayer({ color }) {
  return (
    <div
      style={{ "--grid-color": color }}
      className="grid-layer"
    />
  );
}

function EllipseGradient({ color }) {
  return (
    <div className="ellipse-gradient">
      <svg
        width="356"
        height="196"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 98) rotate(90) scale(98 178)"
          >
            <stop stopColor={color} stopOpacity="0.08" />
            <stop offset="0.34" stopColor={color} stopOpacity="0.04" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function Layer1({ color, secondaryColor }) {
  return (
    <div
      className="layer layer1"
      style={{
        "--color": color,
        "--secondary-color": secondaryColor,
      }}
    >
      <div className="pill-tag">
        <div className="dot" style={{ background: "var(--color)" }} />
        <span>Critical (+15.2%)</span>
      </div>
      <div className="pill-tag">
        <div className="dot" style={{ background: "var(--secondary-color)" }} />
        <span>High (+18.7%)</span>
      </div>
    </div>
  );
}


function Layer3({ color }) {
  return (
    <div className="layer layer3">
      <svg
        width="356"
        height="180"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_linear_29_3)" />
        <defs>
          <linearGradient
            id="paint0_linear_29_3"
            x1="178"
            y1="0"
            x2="178"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.35" stopColor={color} stopOpacity="0" />
            <stop offset="1" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Layer4({ color, secondaryColor, hovered }) {
  const baseHeights = [
    { c: 20, h: 32 },
    { c: 28, h: 45 },
    { c: 35, h: 58 },
    { c: 48, h: 72 },
    { c: 62, h: 88 },
    { c: 85, h: 105 },
    { c: 102, h: 125 },
  ];

  const rectsData = [];
  const startX = 24;
  const gapBetweenDays = 44; // Total width is 356. ~24 + 6 * 44 = 288 + space for bars.

  baseHeights.forEach((day, i) => {
    // Critical (Pink)
    rectsData.push({
      width: 14,
      height: Math.max(8, day.c - 12), // Lower resting height
      y: 150 - Math.max(8, day.c - 12),
      hoverHeight: day.c,
      hoverY: 150 - day.c,
      x: startX + i * gapBetweenDays,
      fill: `${color}66`, // 40% opacity using hex
      hoverFill: color,
    });
    // High (Orange)
    rectsData.push({
      width: 14,
      height: Math.max(12, day.h - 18),
      y: 150 - Math.max(12, day.h - 18),
      hoverHeight: day.h,
      hoverY: 150 - day.h,
      x: startX + 16 + i * gapBetweenDays,
      fill: `${secondaryColor}66`, // 40% opacity using hex
      hoverFill: secondaryColor,
    });
  });

  return (
    <div className="layer layer4">
      <svg width="356" height="180" xmlns="http://www.w3.org/2000/svg">
        {rectsData.map((rect, index) => (
          <rect
            key={index}
            width={rect.width}
            height={hovered ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={hovered ? rect.hoverY : rect.y}
            fill={hovered ? rect.hoverFill : rect.fill}
            rx="2"
            ry="2"
            className="chart-rect"
          />
        ))}
      </svg>
    </div>
  );
}
