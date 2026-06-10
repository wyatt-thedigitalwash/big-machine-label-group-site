"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface VideoLightboxProps {
  videoId: string | null;
  onClose: () => void;
}

export default function VideoLightbox({ videoId, onClose }: VideoLightboxProps) {
  const [isClosing, setIsClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (!videoId) return;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => closeRef.current?.focus(), 100);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();

      // Focus trap
      if (e.key === "Tab" && backdropRef.current) {
        const focusable = backdropRef.current.querySelectorAll<HTMLElement>(
          'button, iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [videoId, handleClose]);

  if (!videoId) return null;

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.95)",
        animation: isClosing
          ? "lightboxFadeOut 300ms ease-out forwards"
          : "lightboxFadeIn 300ms ease-out forwards",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <button
        ref={closeRef}
        onClick={handleClose}
        aria-label="Close video"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 flex items-center justify-center bg-transparent border-none cursor-pointer z-10 transition-colors duration-300 ease-out"
      >
        <span
          className="font-[family-name:var(--font-body)] text-white hover:text-[#CA2125]"
          style={{ fontSize: 14 }}
          aria-hidden="true"
        >
          ✕
        </span>
      </button>
      <div
        className="relative"
        style={{ width: "min(90vw, 1100px)", aspectRatio: "16 / 9" }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-none"
          title="Video player"
        />
      </div>
    </div>
  );
}
