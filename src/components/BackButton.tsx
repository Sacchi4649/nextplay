"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
}

export default function BackButton({ 
  fallbackHref = "/games", 
  label = "Back to Games",
  className = ""
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Use browser history to go back
    // This properly triggers scroll restoration
    if (typeof window !== "undefined" && window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}
