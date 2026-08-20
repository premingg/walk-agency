import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Classes for the inner content box. Must keep an opaque background. */
  className?: string;
  /** Border radius utility, kept in sync between border layer and content. */
  radius?: string;
  /** Varies the starting angle of the conic gradient per card. */
  index?: number;
};

/**
 * Card wrapper with a neon "Gemini" conic-gradient outline that spins on hover.
 * The gradient stays a 2px outline — the inner box keeps its own opaque surface.
 */
const GeminiCard = ({ children, className, radius = "rounded-3xl", index = 0 }: Props) => {
  const start = [0, 90, 180, 270][index % 4];

  return (
    <div className={cn("group relative h-full transition-all duration-500 hover:-translate-y-2", radius)}>
      <div
        className={cn(
          "pointer-events-none absolute -inset-[2px] overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          radius,
        )}
        style={{ boxShadow: "0 0 24px -4px rgba(66,133,244,0.35)" }}
        aria-hidden
      >
        <div
          className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
          style={{ background: `conic-gradient(from ${start}deg, #4285f4, #9b72cb, #d96570, #4285f4)` }}
        />
      </div>

      <div className={cn("relative z-10 h-full", radius, className)}>{children}</div>
    </div>
  );
};

export default GeminiCard;
