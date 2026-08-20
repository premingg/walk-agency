import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CardProject = { slug: string; title: string; image: string };

const ProjectCard = ({ project, large = false }: { project: CardProject; large?: boolean }) => (
  <Link
    to={`/work/${project.slug}`}
    className={cn("group relative block overflow-hidden border border-border bg-surface", large ? "aspect-[16/10]" : "aspect-[4/3]")}
  >
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      width={1920}
      height={1080}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-5">
      <div className="flex items-end justify-between gap-3">
        <h3 className={cn("display", large ? "text-lg md:text-xl" : "text-base md:text-lg")}>{project.title}</h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-teal transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);

export default ProjectCard;
