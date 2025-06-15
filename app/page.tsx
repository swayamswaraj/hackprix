import Spline from '@splinetool/react-spline';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Spline */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/oEAoTFPXn5Uawe2m/scene.splinecode" />
      </div>

      {/* Website Name - Top Center */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-blue-200 via-blue-500 to-purple-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
          InTouch
        </h1>
      </div>

      {/* Overlay Text & Button */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6 text-center pointer-events-none">
        <h2 className="text-white text-3xl md:text-5xl max-w-3xl px-4 font-semibold">
          We’re the <span className="text-blue-400">Google Translate</span> for Indian Sign Language — so no voice ever goes unheard.
        </h2>

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
