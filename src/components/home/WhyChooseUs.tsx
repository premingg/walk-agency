import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whyChooseUs } from "@/data/site";

/**
 * Pinned "Why Choose Us" section.
 * Left column stays static while the reason cards travel right-to-left,
 * driven by scroll progress. Once every point has passed, the page
 * continues to the next section.
 */
const WhyChooseUs = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);

  return (
    <section ref={wrapRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-walk grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Static left column */}
          <div className="max-w-xl">
            <span className="eyebrow inline-flex rounded-full border border-border px-4 py-1.5">Why choose us</span>
            <h2 className="display mt-5 whitespace-pre-line text-section">
              {"Bespoke "}
              <span className="gradient-text">experiences</span>
              {", built\nfor your brand"}
            </h2>
            <p className="mt-5 text-sm text-muted-foreground md:text-base">
              Every experience we craft is rooted in your story. We combine empathy, creativity and operational
              excellence to create immersive moments that connect emotionally, build loyalty and leave a lasting
              impression on your audience.
            </p>
            <Link
              to="/work"
              className="group relative mt-7 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground"
            >
              {/* Animated neon Gemini border */}
              <div
                className="pointer-events-none absolute -inset-[2px] overflow-hidden rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: "0 0 24px -4px rgba(66,133,244,0.35)" }}
                aria-hidden
              >
                <div
                  className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
                  style={{ background: `conic-gradient(from 0deg, #4285f4, #9b72cb, #d96570, #4285f4)` }}
                />
              </div>
              <span className="relative z-10 inline-flex items-center gap-3">
                See all our work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Moving cards */}
          <div className="relative overflow-hidden">
            <motion.div style={{ x }} className="flex w-max gap-5 py-4">
              {whyChooseUs.map((r, i) => {
                const start = [0, 90, 180, 270][i % 4];
                return (
                  <article
                    key={r.title}
                    className="group relative w-[16rem] shrink-0 rounded-3xl transition-all duration-500 hover:-translate-y-2 sm:w-[19rem]"
                  >
                    {/* Animated neon Gemini border */}
                    <div
                      className="pointer-events-none absolute -inset-[2px] overflow-hidden rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ boxShadow: "0 0 24px -4px rgba(66,133,244,0.35)" }}
                      aria-hidden
                    >
                      <div
                        className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
                        style={{ background: `conic-gradient(from ${start}deg, #4285f4, #9b72cb, #d96570, #4285f4)` }}
                      />
                    </div>

                    <div className="relative z-10 h-full rounded-3xl border border-border/70 bg-surface p-6 shadow-glass">
                      <span className="display inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-base text-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display mt-5 text-xl">{r.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
                      <Link
                        to="/services"
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-brand-teal hover:text-brand-teal"
                      >
                        Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </motion.div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
