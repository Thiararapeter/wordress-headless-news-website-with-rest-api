
import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { useEffect, useRef } from "react";

// You will be asked for an API key if not set in .env or localStorage
const VOICE_ID = "9BWtsMINqrJLrRacOk9x"; // Aria (default ElevenLabs voice)
const MODEL_ID = "eleven_multilingual_v2";

interface PostTextToAudioButtonProps {
  text: string;
  className?: string;
}

const PostTextToAudioButton = ({ text, className }: PostTextToAudioButtonProps) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Helper: get/store key
  function getApiKey(): string | null {
    let key = localStorage.getItem("elevenlabs_api_key");
    if (!key) {
      key = prompt(
        "Enter your ElevenLabs API key to enable text-to-speech:\nVisit https://elevenlabs.io/ to get one."
      ) ?? "";
      if (key) localStorage.setItem("elevenlabs_api_key", key);
    }
    return key;
  }

  useEffect(() => {
    // pause on unmount
    return () => audioRef.current?.pause();
  }, []);

  const handlePlay = async () => {
    if (audioRef.current && audioSrc && !loading) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }
    setLoading(true);
    const apiKey = getApiKey();
    if (!apiKey) {
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text.slice(0, 4000),
            model_id: MODEL_ID,
            voice_settings: {
              stability: 0.4,
              similarity_boost: 0.6,
            },
          }),
        }
      );

      if (!resp.ok) {
        throw new Error("Failed to generate audio. Check your API key.");
      }
      const audioBlob = await resp.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioSrc(url);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 200);
    } catch (e) {
      alert("Text-to-speech error: " + (e as Error).message);
    }
    setLoading(false);
  };

  const handleEnded = () => setIsPlaying(false);

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <button
        disabled={loading}
        onClick={handlePlay}
        className={`rounded-full border border-news-accent px-3 py-2 shadow hover:bg-news-accent hover:text-white transition text-sm flex items-center gap-1 ${loading ? "opacity-70" : ""}`}
        aria-label={isPlaying ? "Pause audio" : "Play post audio"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        {loading ? "Loading Audio..." : isPlaying ? "Pause Audio" : "Listen"}
      </button>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={handleEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          hidden
        />
      )}
    </div>
  );
};

export default PostTextToAudioButton;
