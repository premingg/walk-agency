import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/common/PageHero";
import Reveal from "@/components/common/Reveal";
import GeminiCard from "@/components/common/GeminiCard";
import { images, insights } from "@/data/site";

import { cn } from "@/lib/utils";

const Insights = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(insights.map((a) => a.category)))];
  const list = insights.filter((a) => filter === "All" || a.category === filter);

  return (
    <>
      <PageHero eyebrow="Insights" title={"Notes from\nthe field"} image={images.hero2} />

      <div className="surface-light bg-background text-foreground">
        <section className="container-walk py-14">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors",
                  filter === c ? "border-brand-blue text-brand-blue" : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="container-walk grid gap-10 pb-16 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.05}>
              <GeminiCard index={i} className="border border-border/70 bg-surface p-5 shadow-glass transition-shadow duration-300 group-hover:shadow-cinema">
                <Link to={`/insights/${a.slug}`} className="block">
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <img src={a.image} alt={a.title} loading="lazy" width={1920} height={1080} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-brand-blue">
                    {a.category} · {new Date(a.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </p>
                  <h2 className="display mt-2 text-2xl">{a.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                </Link>
              </GeminiCard>
            </Reveal>
          ))}

        </section>
      </div>
    </>
  );
};

export default Insights;
