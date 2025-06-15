'use client';

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Spline from '@splinetool/react-spline';

export default function InterpreterPage() {
  const webcamRef = useRef<Webcam>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [constructedText, setConstructedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureAndPredict = async () => {
    if (!webcamRef.current) return;

    setLoading(true);
    setError(null);
    setPrediction(null);

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      setError("Unable to capture image");
      setLoading(false);
      return;
    }

    const blob = await (await fetch(imageSrc)).blob();
    const file = new File([blob], "snapshot.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.prediction) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || "Prediction failed");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (prediction) {
      setConstructedText((prev) => prev + prediction);
      setPrediction(null);
    }
  };

  const handleRetake = () => {
    setPrediction(null);
    setError(null);
  };

  const handleRefresh = () => {
    setConstructedText("");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 -z-10">
        <Spline
        scene="https://prod.spline.design/AkVomxSTOLXjvBOh/scene.splinecode" 
      />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-white space-y-6">
        <h1 className="text-3xl md:text-5xl font-semibold text-center">ISL Interpreter</h1>

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="rounded-lg border-4 border-white w-full max-w-md shadow-xl"
        />

        <button
          onClick={captureAndPredict}
          disabled={loading}
          className="transition-all bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-6 py-3 rounded-xl text-white shadow-lg disabled:opacity-50"
        >
          {loading ? "Predicting..." : "📸 Capture & Predict"}
        </button>

        {prediction && (
          <div className="text-xl text-white flex flex-col items-center space-y-4">
            <p>
              🔤 Predicted Letter: <span className="font-bold text-blue-200">{prediction}</span>
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleAdd}
                className="transition-all bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105"
              >
                ✅ Add
              </button>
              <button
                onClick={handleRetake}
                className="transition-all bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105"
              >
                🔁 Retake
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-red-400 font-medium text-lg">⚠️ {error}</p>}

        {/* Constructed Sentence */}
        <div className="mt-6 text-center flex flex-col items-center space-y-3">
          <div className="bg-white/90 text-black px-4 py-3 rounded-xl min-w-[300px] min-h-[60px] text-lg shadow-inner backdrop-blur">
            {constructedText || "...."}
          </div>
          <button
            onClick={handleRefresh}
            className="transition-all bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105"
          >
            🗑️ Clear Sentence
          </button>
        </div>
      </div>
    </div>
  );
}
