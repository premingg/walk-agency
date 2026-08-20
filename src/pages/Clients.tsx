import { Link } from "react-router-dom";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import GeminiCard from "@/components/common/GeminiCard";
import { useClientLogos, useWork } from "@/hooks/useContent";
import { images } from "@/data/site";

const Clients = () => {
  const { data: clients = [] } = useClientLogos();
  const { data: projects = [] } = useWork();

  return (
    <>
      <PageHero eyebrow="Clients" title={"Brands we've\nwalked with"} image={images.hero2} />

      <section className="container-walk py-12">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.02}>
              <GeminiCard
                index={i}
                radius="rounded-2xl"
                className="grid h-32 place-items-center border border-border/70 bg-surface px-4 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground shadow-sm transition-shadow duration-300 group-hover:shadow-glass"
              >
                {c.logo ? (
                  <img src={c.logo} alt={c.name} loading="lazy" className="h-16 w-full object-contain" />
                ) : (
                  c.name
                )}
              </GeminiCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container-walk">
          <SectionHeading eyebrow="Case notes" title="Selected stories" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <GeminiCard index={i} className="border border-border/70 bg-surface shadow-glass transition-shadow duration-300 group-hover:shadow-cinema">
                  <Link to={`/work/${p.slug}`} className="block h-full p-8">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-brand-teal">{p.client}</p>
                    <h3 className="display mt-3 text-2xl">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{p.overview}</p>
                  </Link>
                </GeminiCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Clients;
