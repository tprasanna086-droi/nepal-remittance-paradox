"use client";

import { useEffect } from "react";

export default function Map() {
  useEffect(() => {
    // Map initialization will go here with react-leaflet
  }, []);

  return (
    <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center border">
      <p className="text-gray-500">Nepal district map will render here</p>
    </div>
  );
}
