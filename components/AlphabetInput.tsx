"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AlphabetInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length <= 1 && /^[a-zA-Z]?$/.test(input)) {
      setValue(input);
    }
  };

  const upperValue = value.toUpperCase();
  const isValidAlphabet = /^[A-Z]$/.test(upperValue);

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-6 p-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-semibold text-gray-800">Enter an Alphabet</h1>

        <input
          id="value"
          placeholder="A-Z"
          value={value}
          onChange={handleChange}
          maxLength={1}
          className="text-black text-xl px-6 py-3 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* <button
          type="submit"
          className="px-6 py-3 text-white text-xl bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300"
        >
          Submit
        </button> */}

        {/* Animated Image Display */}
        <AnimatePresence mode="wait">
          {isValidAlphabet && (
            <motion.div
              key={upperValue}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-4"
            >
              <Image
                src={`/isl-svg/${upperValue}.svg`}
                alt={`ISL Alphabet ${upperValue}`}
                width={200}
                height={200}
                className="rounded-lg shadow-md object-contain bg-amber-50"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
