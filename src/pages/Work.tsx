import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ParallaxHero from "@/components/common/ParallaxHero";
import Reveal from "@/components/common/Reveal";
import GeminiCard from "@/components/common/GeminiCard";
import { images } from "@/data/site";
import { useWork, type WorkItem } from "@/hooks/useContent";
import { cn } from "@/lib/utils";

const heroImages = [images.hero1, images.hero3, images.hero2, images.hero4];

/** Editorial project frame — meta reveals on hover, image holds the weight. */
const WorkTile = ({
  project,
  i,
  className,
  ratio,
}: {
  project: WorkItem;
  i: number;
  className?: string;
  ratio: string;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 44, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -16, scale: 0.98 }}
    transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    <Link to={`/work/${project.slug}`} className="group relative block overflow-hidden rounded-3xl">
      <div className={cn("w-full overflow-hidden", ratio)}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.1]"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="display text-lg text-white md:text-2xl">{project.title}</h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/70">
              {project.city} · {project.year}
            </p>
          </div>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 backdrop-blur-md">
            <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Work = () => {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const { data: projects = [] } = useWork();
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);

  const list = projects.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      (query.trim() === "" ||
        `${p.title} ${p.client} ${p.category} ${p.city}`.toLowerCase().includes(query.toLowerCase())),
  );

  // Asymmetric mosaic pattern — repeats every 5 tiles.
  const layout = [
    { className: "md:col-span-7", ratio: "aspect-[16/10]" },
    { className: "md:col-span-5 md:mt-10", ratio: "aspect-[4/5]" },
    { className: "md:col-span-4", ratio: "aspect-[4/5]" },
    { className: "md:col-span-8 md:-mt-6", ratio: "aspect-[16/9]" },
    { className: "md:col-span-6", ratio: "aspect-[5/4]" },
  ];

  const strip = [...projects, ...projects];

  return (
    <>
      <ParallaxHero eyebrow="Our Work" title={"Proof, not\npromises"} images={heroImages} />

      {/* Filters */}
      <section className="container-walk pt-10 md:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors",
                  filter === c ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {filter === c && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full border border-brand-teal"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden
                  />
                )}

                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-2.5 transition-colors focus-within:border-brand-teal">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Search projects</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search work"
              className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>
      </section>

      {/* Mosaic grid */}
      <section className="container-walk pt-6 md:pt-8">
        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          <AnimatePresence initial={false}>
            {list.map((p, i) => {
              const l = layout[i % layout.length];
              return <WorkTile key={p.slug} project={p} i={i} className={l.className} ratio={l.ratio} />;
            })}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-14 text-center text-muted-foreground">No projects match that search.</p>}
      </section>

      {/* Continuous image strip */}
      <section className="overflow-hidden pt-14 md:pt-20">
        <div className="flex">
          <motion.div
            className="flex shrink-0 gap-4 pr-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {strip.map((p, i) => (
              <Link
                key={`${p.slug}-${i}`}
                to={`/work/${p.slug}`}
                className="group relative block h-[36vw] w-[52vw] shrink-0 overflow-hidden rounded-2xl md:h-[22vw] md:w-[30vw]"
              >
                <img
                  src={i % 2 === 0 ? p.image : p.detailImage}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-surface/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                  {p.city}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-walk py-16 md:py-20">
        <Reveal>
          <GeminiCard
            radius="rounded-3xl"
            index={1}
            className="flex flex-wrap items-center justify-between gap-6 border border-border/70 bg-surface px-7 py-7 shadow-glass md:px-10"
          >
            <p className="display text-2xl md:text-4xl">Your brief could be next.</p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              Request a Proposal <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </GeminiCard>
        </Reveal>
      </section>
    </>
  );
};

export default Work;
