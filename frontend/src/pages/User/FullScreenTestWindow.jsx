import React, { useEffect, useRef, useState } from "react";
import PreventCheating from "../../components/PreventCheating.jsx";
import { toast } from "react-toastify";

const FullScreenTestWindow = ({ isOpen, onClose, onAutoSubmit }) => {
  const containerRef = useRef(null);
  const [violationCount, setViolationCount] = useState(0);
  const MAX_VIOLATIONS = 3;

  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (containerRef.current && !document.fullscreenElement) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error("Fullscreen request failed:", err);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        toast.error("Fullscreen mode exited. Test will be auto-submitted.");
        if (onAutoSubmit) onAutoSubmit();
        onClose();
      }
    };

    if (isOpen) {
      enterFullscreen();
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    }

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isOpen, onClose, onAutoSubmit]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolationCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= MAX_VIOLATIONS) {
            alert("Test auto-submitted due to suspicious behavior.");
            if (onAutoSubmit) onAutoSubmit();
            onClose();
          }
          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onClose, onAutoSubmit]);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      const blockedKeys = ["F12", "Tab", "Meta", "Control", "Alt"];

      if (blockedKeys.includes(e.key) || (e.ctrlKey && e.key === "r")) {
        e.preventDefault();
      }

      if (e.key === "Escape") {
        alert("ESC key pressed. Test will be auto-submitted.");
        if (onAutoSubmit) onAutoSubmit();
        onClose();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onAutoSubmit]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center"
    >
      <PreventCheating />
      <h1 className="text-3xl font-bold mb-4">Test Started</h1>
      <p className="text-sm mb-2">
        Violations: {violationCount}/{MAX_VIOLATIONS}
      </p>
      <button
        className="bg-white text-black px-4 py-2 rounded"
        onClick={() => {
          if (onAutoSubmit) onAutoSubmit();
          onClose();
        }}
      >
        Exit Test
      </button>
    </div>
  );
};

export default FullScreenTestWindow;
