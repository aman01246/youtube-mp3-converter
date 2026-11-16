
import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ConverterCard from "./components/ConverterCard";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError("");
      setSuccess("");
    } catch {
      setError("Unable to access clipboard. Please paste manually.");
    }
  };

  const handleConvert = async () => {
    setError("");
    setSuccess("");

    if (!url.trim()) {
      setError("Please paste a YouTube video URL.");
      return;
    }

    try {
      const parsedUrl = new URL(url.trim());

      const allowedHosts = [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtu.be"
      ];

      if (
        parsedUrl.protocol !== "https:" ||
        !allowedHosts.includes(parsedUrl.hostname)
      ) {
        throw new Error("Please enter a valid YouTube URL.");
      }
    } catch (err) {
      setError(err.message || "Invalid YouTube URL.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/youtube/convert?url=${encodeURIComponent(url.trim())}`
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Conversion failed.");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "youtube-audio.mp3";

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 1000);

      setSuccess("MP3 downloaded successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="glow glow-left"></div>
      <div className="glow glow-right"></div>

      <Navbar />

      <main className="main-layout">
        <HeroSection />

        <ConverterCard
          url={url}
          setUrl={setUrl}
          loading={loading}
          error={error}
          success={success}
          setError={setError}
          setSuccess={setSuccess}
          onPaste={handlePaste}
          onConvert={handleConvert}
        />
      </main>
    </div>
  );
}

export default App;
