import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

const SectionHeading = ({ eyebrow, title, intro, align = "left", className }: Props) => (
  <Reveal className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && (
      <div className={cn("mb-4 flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="eyebrow">{eyebrow}</span>
      </div>
    )}
    <h2 className="display text-section">{title}</h2>
    {intro && <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p>}
  </Reveal>
);

export default SectionHeading;
