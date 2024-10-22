"use client";

import { ArrowDownOutlined } from "@ant-design/icons";
import Image from "next/image";
import HeroImage from "./hero-image.jpg";
import { Switch } from "antd";

// components/HeroSection.tsx
export default function HeroSection({ setDarkMode, darkMode }) {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-cover bg-center h-screen flex items-center justify-center">
      {/* Use Image from next/image for optimization */}
      <Image
        src={HeroImage}
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      {/* Dark Mode Switch at the top-left */}
      <div
        className={`absolute top-4 left-4 ${
          darkMode ? "bg-black" : "bg-white"
        } bg-opacity-90 rounded-lg shadow-lg p-2 flex items-center gap-2 z-20 md:top-6 md:left-6`}
      >
        <div
          className={`font-semibold text-sm md:text-base ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Dark Mode
        </div>
        <Switch
          checked={darkMode}
          value={darkMode}
          onChange={(checked) => setDarkMode(checked)}
          style={{
            backgroundColor: darkMode ? "" : "#727272",
          }}
        />
      </div>

      <div className="z-10 flex flex-col items-center justify-center">
        <h1
          className={`text-4xl md:text-6xl ${
            darkMode ? "text-white" : "text-black"
          } font-bold text-center ${
            darkMode ? "bg-black" : "bg-white"
          } bg-opacity-80 rounded-lg shadow-lg p-4`}
        >
          Welcome to Fix Health
        </h1>

        <button
          className="absolute bottom-10 animate-bounce cursor-pointer"
          onClick={handleScroll}
        >
          <ArrowDownOutlined className="h-12 w-12 text-white" />
        </button>
      </div>
    </div>
  );
}
