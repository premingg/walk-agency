import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useContent";

/** Client voices — managed in /walk-manager. */
const Testimonials = () => {
  const { data: items = [] } = useTestimonials();
  const [i, setI] = useState(0);

  if (!items.length) return null;
  const t = items[i % items.length];
  const move = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface p-8 shadow-glass md:p-14">
      <span className="absolute inset-x-0 top-0 h-[2px] bg-walk-gradient opacity-60" aria-hidden />
      <Quote className="h-8 w-8 text-brand-teal" aria-hidden />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={t.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <p className="display max-w-4xl text-2xl leading-tight md:text-4xl">{t.quote}</p>
          <footer className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            {t.avatar && (
              <img src={t.avatar} alt={t.author} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
            )}
            <span>
              <span className="block text-foreground">{t.author}</span>
              {t.role}
            </span>
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-10 flex items-center gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous testimonial"
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-brand-teal hover:text-brand-teal"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next testimonial"
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-brand-teal hover:text-brand-teal"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="ml-3 flex gap-1.5">
          {items.map((it, idx) => (
            <span
              key={it.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === i % items.length ? "w-6 bg-walk-gradient" : "w-1.5 bg-border"
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
