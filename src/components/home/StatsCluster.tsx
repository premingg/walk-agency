import { motion } from "framer-motion";
import Counter from "@/components/common/Counter";
import { useStats } from "@/hooks/useContent";

/**
 * Tight 2-row stat grid: 3 columns on desktop, 2 on tablet, 1 on mobile.
 * Each card is compact, content fills the box, no awkward empty space.
 */
const StatsCluster = () => {
  const { data: stats = [] } = useStats();
  const items = stats.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="container-walk relative">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {items.map((s, i) => {
            const accent = i === 0;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div
                  className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-500 md:p-5 ${
                    accent
                      ? "border-transparent bg-brand-blue text-primary-foreground shadow-cinema"
                      : "border-border/60 bg-surface shadow-glass hover:border-brand-teal/60 hover:shadow-cinema"
                  }`}
                >
                  {/* soft glow on hover */}
                  <div
                    className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                    style={{
                      background: accent
                        ? "radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)"
                        : "radial-gradient(circle, hsl(var(--brand-teal) / 0.4), transparent 70%)",
                    }}
                    aria-hidden
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                        accent ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                        accent ? "bg-primary-foreground/60" : "bg-brand-teal"
                      }`}
                      aria-hidden
                    />
                  </div>

                  <div className="relative mt-4">
                    <Counter
                      value={s.value}
                      suffix={s.suffix}
                      className="text-3xl font-medium sm:text-4xl md:text-5xl"
                    />

                    <p
                      className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] md:text-xs ${
                        accent ? "text-primary-foreground/85" : "text-foreground/80"
                      }`}
                    >
                      {s.label}
                    </p>

                    {s.note && (
                      <p
                        className={`mt-2 line-clamp-2 text-[11px] leading-relaxed md:text-xs ${
                          accent ? "text-primary-foreground/65" : "text-muted-foreground"
                        }`}
                      >
                        {s.note}
                      </p>
                    )}

                    <span
                      className={`mt-3 block h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 ${
                        accent ? "bg-primary-foreground/60" : "bg-brand-teal"
                      }`}
                      aria-hidden
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCluster;
