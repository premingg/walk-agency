import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
const loadApi = () => {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve) => {
    if (window.YT?.Player) return resolve();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
  });
  return apiPromise;
};

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

type Props = { youtubeId: string; poster: string; title: string };

/**
 * Custom player shell around the YouTube IFrame API.
 * The iframe is only created after the user hits play (lazy-loaded),
 * and all stock YouTube chrome is covered by our own controls.
 */
const CustomVideoPlayer = ({ youtubeId, poster, title }: Props) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    let cancelled = false;

    loadApi().then(() => {
      if (cancelled || !hostRef.current) return;
      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: youtubeId,
        playerVars: { controls: 0, modestbranding: 1, rel: 0, playsinline: 1, disablekb: 1, iv_load_policy: 3, fs: 0 },
        events: {
          onReady: (e: any) => {
            setDuration(e.target.getDuration());
            e.target.playVideo();
          },
          onStateChange: (e: any) => setPlaying(e.data === 1),
        },
      });

      const tick = () => {
        const p = playerRef.current;
        if (p?.getCurrentTime) {
          setTime(p.getCurrentTime());
          if (!duration && p.getDuration) setDuration(p.getDuration());
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, youtubeId]);

  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    playing ? p.pauseVideo() : p.playVideo();
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    muted ? p.unMute() : p.mute();
    setMuted(!muted);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setTime(v);
    playerRef.current?.seekTo(v, true);
  };

  return (
    <div ref={wrapRef} className="relative aspect-video w-full overflow-hidden border border-border bg-black">
      {started ? (
        <>
          <div className="pointer-events-none absolute inset-0">
            <div ref={hostRef} className="h-full w-full scale-[1.35]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 bg-gradient-to-t from-black/90 to-transparent p-4">
            <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="text-white">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <span className="w-12 text-xs text-white/80">{fmt(time)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={time}
              onChange={seek}
              aria-label="Seek"
              className="h-1 flex-1 cursor-pointer appearance-none rounded bg-white/25 accent-brand-teal"
            />
            <span className="w-12 text-right text-xs text-white/80">{fmt(duration)}</span>
            <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-white">
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={() => wrapRef.current?.requestFullscreen?.()}
              aria-label="Fullscreen"
              className="text-white"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <button type="button" onClick={() => setStarted(true)} className="group absolute inset-0" aria-label={`Play ${title}`}>
          <img src={poster} alt={title} loading="lazy" width={1920} height={1080} className="h-full w-full object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-black/40 transition-colors group-hover:bg-black/25">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-walk-gradient">
              <Play className="h-7 w-7 translate-x-[2px] text-white" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
