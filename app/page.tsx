import Spline from '@splinetool/react-spline';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Spline */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/oEAoTFPXn5Uawe2m/scene.splinecode" />
      </div>

      {/* Overlay Text & Button */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6 text-center pointer-events-none">
        <h1 className="text-white text-3xl md:text-5xl max-w-3xl px-4 font-semibold">
          We’re the <span className="text-blue-400">Google Translate</span> for Indian Sign Language — so no voice ever goes unheard.
        </h1>

        {/* This button must be able to capture events */}
        <Link
          href="/get-started"
          className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg font-medium transition transform duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-lg pointer-events-auto"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
