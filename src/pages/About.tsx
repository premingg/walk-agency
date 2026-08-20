import { Link } from "react-router-dom";
import { ArrowRight, MonitorPlay, PenTool, Play, Users, ListChecks } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import Counter from "@/components/common/Counter";
import GeminiCard from "@/components/common/GeminiCard";
import { images, settings } from "@/data/site";
import { useMilestones, useStats, useTeam } from "@/hooks/useContent";


const ideology = [
  { title: "Open Minds", body: "We start with curiosity — the brief behind the brief, the audience behind the target group." },
  { title: "Ignite Hearts", body: "Experiences that land emotionally first, because feeling is what people carry home." },
  { title: "Inspire Actions", body: "Every moment is engineered to move someone — to try, to talk, to buy, to believe." },
];

const onlineCapabilities = [
  { icon: PenTool, label: "Set Design + Management", color: "text-brand-red" },
  { icon: MonitorPlay, label: "Interactivity", color: "text-brand-blue" },
  { icon: Users, label: "Audience Engagement", color: "text-brand-teal" },
  { icon: Play, label: "Live Demos", color: "text-brand-gold" },
  { icon: ListChecks, label: "Feed Testing", color: "text-brand-red" },
];

const About = () => {
  const { data: stats = [] } = useStats();
  const { data: timeline = [] } = useMilestones();
  const { data: team = [] } = useTeam();

  return (
  <div className="bg-background">
    <PageHero
      eyebrow="About WALK"
      title={"Who are we?"}
      intro="A dynamic integrated marketing agency working coherently towards one goal — to deliver innovative and cohesive ideas."
      image={images.hero2}
    />

    {/* Who are we */}
    <section className="container-walk grid items-center gap-12 py-12 md:py-16 lg:grid-cols-2 lg:gap-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border/70 shadow-cinema">
          <img
            src={images.hero1}
            alt="The WALK team at work in the Gurugram studio"
            loading="lazy"
            width={1280}
            height={960}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
          />
        </div>
      </Reveal>
      <Reveal delay={0.1} className="space-y-5">
        <p className="text-lg text-foreground md:text-xl">
          Our solutions are creative, built to the client&apos;s needs, and designed to give seamless experiences
          to both the brand and its audience.
        </p>
        <p className="text-muted-foreground">
          In a world where brands get lost in the white noise of modern life, we create a blend of experience and
          agility — leaving an <span className="gradient-text font-semibold">experiential footprint</span> in the
          audience&apos;s mind.
        </p>
        <p className="text-muted-foreground">
          We embrace audiences, bring brands alive and have fun while doing it. We transform environments into
          experiences that move people emotionally.
        </p>
      </Reveal>
    </section>

    {/* Ideology */}
    <section className="container-walk pb-12 md:pb-16">
      <SectionHeading eyebrow="Our ideology" title="Open minds. Ignite hearts. Inspire actions." />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {ideology.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06}>
            <GeminiCard
              index={i}
              className="border border-border/70 bg-surface p-7 shadow-glass transition-shadow duration-300 group-hover:shadow-cinema"
            >
              <h3 className="display text-2xl">{it.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{it.body}</p>
            </GeminiCard>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Stats */}
    <section className="container-walk pb-12 md:pb-16">
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06}>
            <GeminiCard
              index={i + 1}
              className="border border-transparent bg-background p-7 text-center transition-all duration-300 group-hover:border-border/70 group-hover:bg-surface group-hover:shadow-glass"
            >
              <div className="display text-5xl gradient-text md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted-foreground">{s.label}</p>
            </GeminiCard>
          </Reveal>
        ))}

      </div>
    </section>

    {/* WALK Online */}
    <section className="container-walk pb-12 md:pb-16">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="Digital trail" title="WALK Online" />
          <p className="mt-6 text-muted-foreground">
            WALK Online helps brands connect in extraordinary ways — digital experiences built through content
            creation and brand activation, fuelled by creativity, inspired by trends and backed by insight.
          </p>
          <p className="mt-4 text-muted-foreground">
            It weaves digital and brand ethos together so the experience immerses the audience while meeting the
            goals of the brand. Whether the room holds 4 people or 400, we create content that makes people think
            differently — and we track its impact.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-border/70 shadow-cinema">
            <img
              src={images.hero3}
              alt="WALK Online team producing digital content"
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {onlineCapabilities.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <GeminiCard
              index={i}
              className="flex flex-col items-center gap-4 border border-border/70 bg-surface p-6 text-center shadow-glass transition-shadow duration-300 group-hover:shadow-cinema"
            >
              <c.icon className={`h-9 w-9 ${c.color} transition-transform duration-300 group-hover:scale-110`} strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">{c.label}</span>
            </GeminiCard>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Milestones */}
    <section className="container-walk pb-12 md:pb-16">
      <SectionHeading eyebrow="Milestones" title="The walk so far" />
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {timeline.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.05}>
            <li className="h-full">
              <GeminiCard
                index={i}
                className="border border-border/70 bg-surface p-6 shadow-glass transition-shadow duration-300 group-hover:shadow-cinema"
              >
                <span className="display text-2xl gradient-text">{t.year}</span>
                <h3 className="mt-4 text-lg">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
              </GeminiCard>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>

    {/* Team */}
    {team.length > 0 && (
      <section className="container-walk pb-12 md:pb-16">
        <SectionHeading eyebrow="The crew" title="Faces behind the footprint" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-3xl border border-border/70 bg-surface shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-glass">
                <div className="aspect-[4/5] w-full overflow-hidden bg-background">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="display bg-walk-gradient bg-clip-text text-4xl text-transparent">
                        {m.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="display text-xl">{m.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{m.title}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-xs uppercase tracking-[0.18em] text-brand-blue transition-opacity hover:opacity-70"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    )}

    {/* CTA */}
    <section className="container-walk pb-12 md:pb-16">
      <Reveal>
        <GeminiCard
          index={3}
          className="flex flex-col items-start justify-between gap-6 border border-border/70 bg-surface p-8 shadow-glass transition-shadow duration-300 group-hover:shadow-cinema md:flex-row md:items-center md:p-10"
        >
          <div>
            <h2 className="display text-3xl md:text-4xl">Got a brief? Let&apos;s walk it.</h2>
            <p className="mt-3 text-sm text-muted-foreground">{settings.address}</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:border-brand-teal hover:text-brand-teal"
          >
            Request a Proposal <ArrowRight className="h-4 w-4" />
          </Link>
        </GeminiCard>
      </Reveal>
    </section>

  </div>
  );
};

export default About;
