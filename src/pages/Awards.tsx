import { Trophy } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import Reveal from "@/components/common/Reveal";
import GeminiCard from "@/components/common/GeminiCard";
import { useAwards } from "@/hooks/useContent";
import { images } from "@/data/site";

const Awards = () => {
  const { data: awards = [] } = useAwards();

  return (
    <>
      <PageHero eyebrow="Awards & Recognition" title={"Kept on\nthe shelf"} image={images.hero4} />

      <section className="container-walk py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.04}>
              <GeminiCard
                index={i}
                className="flex flex-col border border-border/70 bg-surface p-8 shadow-glass transition-shadow duration-300 group-hover:shadow-cinema"
              >
                <Trophy className="h-7 w-7 text-brand-gold" />
                <h2 className="display mt-8 text-2xl">{a.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
                <span className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">{a.year}</span>
              </GeminiCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Awards;
