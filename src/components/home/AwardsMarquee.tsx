import { Trophy } from "lucide-react";
import { useAwards } from "@/hooks/useContent";

/**
 * Horizontal infinite awards loop. Every card reads fully at rest —
 * trophy, year, title and category — with a soft lift + gradient hairline on hover.
 */
const AwardsMarquee = () => {
  const { data: awards = [] } = useAwards();
  const row = [...awards, ...awards, ...awards];

  if (!awards.length) return null;

  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex w-max animate-marquee gap-5 pr-5 hover:[animation-play-state:paused]">
        {row.map((a, i) => (
          <article
            key={`${a.id}-${i}`}
            className="group relative flex h-44 w-72 shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-surface p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glass"
          >
            <span
              className="absolute inset-x-0 top-0 h-[2px] bg-walk-gradient opacity-40 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <div className="flex items-start justify-between gap-4">
              <Trophy className="h-7 w-7 shrink-0 text-brand-gold transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{a.year}</span>
            </div>
            <div>
              <h3 className="display text-xl leading-tight">{a.title}</h3>
              {a.body && <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{a.body}</p>}
            </div>
          </article>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-28" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-28" aria-hidden />
    </div>
  );
};

export default AwardsMarquee;
