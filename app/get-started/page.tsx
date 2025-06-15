import Spline from '@splinetool/react-spline';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-black flex flex-col items-center justify-center space-y-10 px-4 py-10">
      {/* Heading */}
      <h1 className="text-white text-3xl md:text-5xl text-center max-w-4xl font-semibold">
  Translate signs in real time or learn them at your pace — bridging communication for everyone.
</h1>


      {/* Cards with Spline background */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Card 1 */}
        <div className="w-80 h-96 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm relative">
          {/* Spline background */}
          <div className="absolute inset-0 -z-10">
           <Spline
        scene="https://prod.spline.design/S7aHtFc8A4z7MnJf/scene.splinecode" 
      />
          </div>

          {/* Card content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div>
              <h2 className="text-white text-xl font-semibold mb-2">Interpreter</h2>
              <p className="text-white/80 text-sm">Convert ISL gestures to text and audio in real-time.</p>
            </div>
            <Link href='/interpreter' className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-center px-6 py-4 rounded-xl transition">
              Try Now
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-80 h-96 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm relative">
          {/* Spline background */}
          <div className="absolute inset-0 -z-10">
            <Spline
        scene="https://prod.spline.design/S7aHtFc8A4z7MnJf/scene.splinecode" 
      />
          </div>

          {/* Card content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6">
            <div>
              <h2 className="text-white text-xl font-semibold mb-2">Learn Signs</h2>
              <p className="text-white/80 text-sm">Practice Indian Sign Language from A–Z with feedback.</p>
            </div>
            
            <Link href='/learn' className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-center px-6 py-4 rounded-xl transition">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
