// components/SplineBackground.tsx
"use client";

import Spline from "@splinetool/react-spline";

export default function SplineBackground() {
  return (
    <Spline
      className="absolute top-0 left-0 w-full h-full z-0"
      scene="https://prod.spline.design/oTB-N4d4RELAgn5T/scene.splinecode"
    />
  );
}
