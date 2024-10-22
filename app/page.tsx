"use client";

import { useState } from "react";
import BookingForm from "./components/BookingForm";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div>
      <HeroSection setDarkMode={setDarkMode} darkMode={darkMode} />
      <BookingForm darkMode={darkMode}  />
      <Testimonials  darkMode={darkMode}  />
    </div>
  );
}
