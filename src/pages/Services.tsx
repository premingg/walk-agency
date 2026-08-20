import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/common/Reveal";
import GeminiCard from "@/components/common/GeminiCard";
import FaqAccordion from "@/components/common/FaqAccordion";
import SectionHeading from "@/components/common/SectionHeading";
import { capabilities, images, services } from "@/data/site";
import { cn } from "@/lib/utils";

const pillarImages = [images.hero1, images.hero2, images.hero3, images.hero4, images.hero2, images.hero3];

const process = [
  { step: "01", title: "Listen", body: "The brief behind the brief.", image: images.hero1 },
  { step: "02", title: "Frame", body: "One idea, sharply argued.", image: images.hero2 },
  { step: "03", title: "Build", body: "Design, fabrication, tech.", image: images.hero3 },
  { step: "04", title: "Run", body: "Crew on ground, show live.", image: images.hero4 },
  { step: "05", title: "Read", body: "Measure, report, improve.", image: images.hero2 },
];

/** Editorial row: click anywhere to expand — image left, copy in the empty space at the right. */
const PillarRow = ({ s, i }: { s: (typeof services)[number]; i: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border-t border-border/70 last:border-b"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-5 py-5 text-left md:gap-8 md:py-7"
      >
        <span className="w-10 shrink-0 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{s.pillar}</span>
          <h2 className="display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
            {s.title}
          </h2>
        </div>

        <div
          className={cn(
            "h-20 w-32 shrink-0 overflow-hidden rounded-xl transition-all duration-500",
            open ? "hidden opacity-0" : "hidden opacity-0 md:block md:group-hover:opacity-100",
          )}
        >
          <img
            src={pillarImages[i % pillarImages.length]}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full scale-110 object-cover transition-transform duration-[1200ms] group-hover:scale-100"
          />
        </div>

        <span
          className={cn(
            "hidden h-2 w-2 shrink-0 rounded-full bg-walk-gradient transition-opacity duration-500 md:block",
            open ? "opacity-100" : "opacity-0 group-hover:opacity-60",
          )}
          aria-hidden
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="grid gap-6 pb-8 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-10 md:pl-[3.75rem] lg:grid-cols-[minmax(0,26rem)_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/3] w-full overflow-hidden rounded-2xl"
          >
            <img
              src={pillarImages[i % pillarImages.length]}
              alt=""
              aria-hidden
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{s.pillar}</span>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{s.detail}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};


const Services = () => (
  <>
    {/* Typographic hero — no image strip */}
    <section className="container-walk pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <span className="eyebrow">Services</span>
        <h1 className="display mt-4 whitespace-pre-line text-[clamp(2.4rem,7vw,5.4rem)]">
          {"Four pillars.\nOne footprint."}
        </h1>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground md:text-base">
          Digital, Events, Activations and Relationships — grouped the way we actually work.
        </p>
      </motion.div>
    </section>

    {/* Pillars — editorial rows */}
    <section className="container-walk pt-10 md:pt-14">
      {services.map((s, i) => (
        <PillarRow key={s.slug} s={s} i={i} />
      ))}
    </section>

    {/* Process — sticky image, scrolling steps */}
    <section className="container-walk pt-14 md:pt-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:h-[70vh]">
          <Reveal className="h-full">
            <div className="relative h-[46vh] overflow-hidden rounded-3xl lg:h-full">
              <img src={images.hero3} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="eyebrow text-white/70">Process</span>
                <h2 className="display mt-2 text-3xl text-white md:text-5xl">How it runs</h2>
              </div>
            </div>
          </Reveal>
        </div>

        <ol className="space-y-3">
          {process.map((p, i) => (
            <motion.li
              key={p.step}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <GeminiCard
                radius="rounded-2xl"
                index={i}
                className="flex items-center gap-5 border border-border/70 bg-surface p-5 md:p-6"
              >
                <span className="display gradient-text text-4xl md:text-5xl">{p.step}</span>
                <div className="min-w-0">
                  <h3 className="display text-xl md:text-2xl">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                </div>
                <div className="ml-auto hidden h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:block">
                  <img src={p.image} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover" />
                </div>
              </GeminiCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>

    {/* Capabilities — drifting marquee rows */}
    <section className="overflow-hidden pt-14 md:pt-20">
      <div className="container-walk">
        <Reveal>
          <span className="eyebrow">Capabilities</span>
        </Reveal>
      </div>
      {[0, 1].map((row) => {
        const items = row === 0 ? capabilities.slice(0, 6) : capabilities.slice(6);
        return (
          <div key={row} className="mt-4 flex overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-3 pr-3"
              animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {[...items, ...items, ...items, ...items].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className={cn(
                    "whitespace-nowrap rounded-full border border-border bg-surface px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-muted-foreground",
                    "transition-colors hover:border-brand-teal hover:text-foreground",
                  )}
                >
                  {c}
                </span>
              ))}
            </motion.div>
          </div>
        );
      })}
    </section>

    {/* FAQs */}
    <section className="container-walk pt-14 md:pt-20">
      <Reveal>
        <SectionHeading eyebrow="Good to know" title="Questions, answered" />
      </Reveal>
      <div className="mt-8">
        <FaqAccordion />
      </div>
    </section>

    {/* CTA */}
    <section className="container-walk py-16 md:py-20">
      <Reveal>
        <GeminiCard
          radius="rounded-3xl"
          index={3}
          className="flex flex-wrap items-center justify-between gap-6 border border-border/70 bg-surface px-7 py-7 shadow-glass md:px-10"
        >
          <p className="display text-2xl md:text-4xl">Got a brief? Let's walk it.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-brand-teal hover:text-brand-teal"
            >
              See our work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              Start an enquiry <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </GeminiCard>
      </Reveal>
    </section>
  </>
);

export default Services;
