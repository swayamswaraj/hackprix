// app/interpreter/page.tsx
'use client';

import { useState } from "react";

export default function InterpreterPage() {
  const [image, setImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", image);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8 text-white">
      <h1 className="text-3xl md:text-5xl font-semibold mb-6">ISL Interpreter</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) setImage(e.target.files[0]);
        }}
        className="mb-4 text-white"
      />

      <button
        onClick={handleUpload}
        disabled={!image || loading}
        className="bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Predicting..." : "Upload & Predict"}
      </button>

      {prediction && (
        <p className="mt-6 text-xl">
          🔤 Predicted Letter: <span className="font-bold">{prediction}</span>
        </p>
      )}

      {error && <p className="mt-4 text-red-400">⚠️ {error}</p>}
    </div>
  );
}
