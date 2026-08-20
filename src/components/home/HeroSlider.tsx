import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useHeroSlides } from "@/hooks/useContent";
import { cn } from "@/lib/utils";

/** Image-only hero. Clicking a slide opens that case study. Managed in /walk-manager. */
const HeroSlider = () => {
  const { data: slides = [] } = useHeroSlides();
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const count = slides.length;

  const go = useCallback((dir: number) => setIndex((i) => (count ? (i + dir + count) % count : 0)), [count]);

  useEffect(() => {
    setIndex(0);
  }, [count]);

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go, count]);

  const slide = slides[index];

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-background">
      <AnimatePresence mode="sync">
        {slide && (
          <motion.button
            key={slide.id}
            type="button"
            onClick={() => navigate(slide.to)}
            aria-label={`Open case study: ${slide.alt}`}
            className="absolute inset-0 cursor-pointer"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={slide.image} alt={slide.alt} width={1920} height={1080} className="h-full w-full object-cover" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="pointer-events-auto inline-block text-center">
          <h1 className="text-lg font-semibold uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] md:text-xl">
            THE EXPERIENTIAL FOOTPRINT
          </h1>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10">
        <div className="container-walk flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "pointer-events-auto h-[4px] w-12 rounded-full transition-all",
                i === index ? "gradient-rule" : "bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
