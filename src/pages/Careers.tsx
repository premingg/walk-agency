import { useState } from "react";
import { toast } from "sonner";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import GeminiCard from "@/components/common/GeminiCard";
import { images } from "@/data/site";
import { useJobs } from "@/hooks/useContent";


const Careers = () => {
  const [role, setRole] = useState("");
  const { data: jobs = [] } = useJobs();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={"Come build\nrooms with us"}
        intro="Life at WALK: long days, big rooms, work you can point at."
        image={images.hero1}
      />

      <section className="container-walk grid gap-6 py-12 md:grid-cols-3">
        {[images.hero1, images.hero3, images.hero4].map((src, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <img src={src} alt="Life at WALK placeholder" loading="lazy" width={1920} height={1080} className="aspect-[4/5] w-full border border-border object-cover" />
          </Reveal>
        ))}
      </section>

      <section className="py-12">
        <div className="container-walk">
          <SectionHeading eyebrow="Open roles" title="Positions & internships" />
          <ul className="mt-12 space-y-4">
            {jobs.map((j, i) => (
              <li key={j.id}>
                <GeminiCard
                  index={i}
                  radius="rounded-2xl"
                  className="flex flex-wrap items-center justify-between gap-4 border border-border/70 bg-background p-6 shadow-sm transition-shadow duration-300 group-hover:shadow-glass"
                >
                  <div>
                    <h3 className="display text-2xl">{j.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {j.location} · {j.type}
                    </p>
                    {j.description && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{j.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRole(j.title);
                      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="rounded-full border border-border px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-brand-teal hover:text-brand-teal"
                  >
                    Apply
                  </button>
                </GeminiCard>
              </li>
            ))}
          </ul>

        </div>
      </section>

      <section id="apply" className="container-walk py-12">
        <SectionHeading eyebrow="Apply" title="Send it over" />
        <GeminiCard index={2} className="mt-10 max-w-3xl border border-border/70 bg-surface p-6 shadow-glass transition-shadow duration-300 group-hover:shadow-cinema md:p-8">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Application received — this form will feed the CMS lead inbox in phase two.");
            }}
          >
            <input required placeholder="Full name" className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal" />
            <input required type="email" placeholder="Email" className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal" />
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role you're applying for"
              className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal"
            />
            <label className="rounded-xl border border-border bg-background px-4 py-4 text-sm text-muted-foreground">
              Attach CV
              <input type="file" className="mt-2 block w-full text-xs" />
            </label>
            <button type="submit" className="rounded-full border border-border px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brand-teal hover:text-brand-teal">
              Submit application
            </button>
          </form>
        </GeminiCard>

      </section>
    </>
  );
};

export default Careers;
