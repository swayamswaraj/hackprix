"use client";
import { useState } from "react";

export default function ISLPredictor() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.prediction) {
        setPrediction(data.prediction);
      } else {
        setPrediction(data.error || "Error");
      }
    } catch (err) {
      console.error("Error uploading:", err);
      setPrediction("Error predicting");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Convert ISL to Text
      </button>
      {prediction && (
        <p className="text-xl font-bold">Predicted Letter: {prediction}</p>
      )}
    </div>
  );
}
