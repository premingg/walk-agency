import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/home/HeroSlider";
import ClientMarquee from "@/components/home/ClientMarquee";
import AwardsMarquee from "@/components/home/AwardsMarquee";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProjectCard from "@/components/work/ProjectCard";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import StatsCluster from "@/components/home/StatsCluster";
import Testimonials from "@/components/home/Testimonials";
import FaqAccordion from "@/components/common/FaqAccordion";
import { useWork } from "@/hooks/useContent";



const Home = () => {
  const { data: projects = [] } = useWork();
  const featuredAll = projects.filter((p) => p.featured);
  const featured = (featuredAll.length ? featuredAll : projects).slice(0, 3);

  return (
    <div className="bg-background">
      <HeroSlider />

      {/* Statement + dual horizontal logo loops */}
      <section className="container-walk py-12 md:py-16">
        <Reveal>
          <p className="display mx-auto max-w-3xl text-center text-section transition-transform duration-500 hover:scale-[1.02]">
            We build brand experiences people <span className="gradient-text">walk into</span> — and walk out changed.
          </p>
        </Reveal>
        <div className="mt-10">
          <ClientMarquee />
        </div>
      </section>

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Stats */}
      <StatsCluster />





      {/* Featured work */}
      <section className="container-walk py-12 md:py-16">
        <SectionHeading eyebrow="Selected work" title="The footprint" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="py-12 md:py-16">
        <div className="container-walk">
          <SectionHeading eyebrow="Recognition" title="Awards" />
          <div className="mt-12">
            <AwardsMarquee />
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/awards"
              className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              See all awards <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>



      {/* Client voices */}
      <section className="container-walk py-12 md:py-16">
        <SectionHeading eyebrow="Client voices" title="What they say" />
        <div className="mt-8">
          <Testimonials />
        </div>
      </section>

      {/* FAQs */}
      <section className="container-walk pb-12 md:pb-16">
        <SectionHeading eyebrow="Good to know" title="Questions, answered" />
        <div className="mt-8">
          <FaqAccordion />
        </div>
      </section>

      {/* Proposal CTA */}
      <section className="container-walk pb-16 pt-4">
        <Reveal>
          <div className="group relative rounded-3xl transition-all duration-500 hover:-translate-y-2">
            {/* Animated neon Gemini border */}
            <div
              className="absolute -inset-[2px] rounded-3xl overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "0 0 24px -4px rgba(66,133,244,0.35)" }}
            >
              <div
                className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
                style={{
                  background: "conic-gradient(from 270deg, #4285f4, #9b72cb, #d96570, #4285f4)",
                }}
              />
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border/70 bg-surface px-8 py-8 shadow-glass transition-all duration-300 group-hover:shadow-cinema">
              <p className="display text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-[1.02]">Got a brief? Let's walk it.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground transition-all duration-300 hover:translate-x-1 hover:border-brand-blue hover:text-brand-blue"
              >
                Request a Proposal <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Home;
