import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import ProjectCard from "@/components/work/ProjectCard";
import { useWork } from "@/hooks/useContent";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data: projects = [], isLoading } = useWork();
  const project = projects.find((p) => p.slug === slug);

  if (isLoading) return <div className="min-h-[70svh]" />;

  if (!project) {
    return (
      <div className="container-walk py-56 text-center">
        <h1 className="display text-5xl">Project not found</h1>
        <Link to="/work" className="mt-8 inline-block link-underline text-sm uppercase tracking-[0.2em]">
          Back to work
        </Link>
      </div>
    );
  }

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);

  return (
    <>
      <section className="relative h-[80svh] w-full overflow-hidden">
        <img src={project.image} alt={project.title} width={1920} height={1080} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" aria-hidden />
        <div className="container-walk absolute inset-x-0 bottom-0 pb-16">
          <Link to="/work" className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <h1 className="display max-w-4xl text-hero">{project.title}</h1>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {[project.client, project.city, project.year].filter(Boolean).join(" · ")}
          </p>
        </div>
      </section>

      <section className="container-walk grid gap-14 py-12 lg:grid-cols-[1.2fr_1fr] md:py-16">
        <Reveal>
          <p className="display text-3xl leading-tight md:text-4xl">{project.overview}</p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-8">
          {project.objective && (
            <div>
              <h2 className="eyebrow">Client objective</h2>
              <p className="mt-3 text-muted-foreground">{project.objective}</p>
            </div>
          )}
          {project.approach && (
            <div>
              <h2 className="eyebrow">Our approach</h2>
              <p className="mt-3 text-muted-foreground">{project.approach}</p>
            </div>
          )}
          {project.highlights.length > 0 && (
            <div>
              <h2 className="eyebrow">Execution highlights</h2>
              <ul className="mt-3 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-muted-foreground">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </section>

      <section className="container-walk pb-16">
        <Reveal>
          <img
            src={project.detailImage}
            alt={`${project.title} visual`}
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full border border-border object-cover"
          />
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="py-12">
          <div className="container-walk">
            <SectionHeading eyebrow="Related" title="More like this" />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 text-center">
        <div className="container-walk">
          <h2 className="display text-section">Want something like this?</h2>
          <Link to="/contact" className="mt-8 inline-block rounded-full border border-border px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brand-teal hover:text-brand-teal">
            Enquire now
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
