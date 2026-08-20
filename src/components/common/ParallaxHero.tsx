import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  images: string[];
};

/**
 * Image-first page hero: a staggered strip of frames that drift at different
 * speeds while the page scrolls. Text sits over the frames, kept small.
 */
const ParallaxHero = ({ eyebrow, title, intro, images }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const yC = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const lanes = [yA, yB, yC, yB];

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 md:pt-40">
      <div className="container-walk relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display mt-4 whitespace-pre-line text-[clamp(2.4rem,7vw,5.4rem)]">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-sm text-muted-foreground md:text-base">{intro}</p>}
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-4">
          {images.slice(0, 4).map((src, i) => (
            <motion.div
              key={i}
              style={{ y: lanes[i % lanes.length] }}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className={
                "group relative overflow-hidden rounded-2xl " +
                (i % 2 === 0 ? "aspect-[3/4] md:mt-8" : "aspect-[4/5]")
              }
            >
              <img
                src={src}
                alt=""
                aria-hidden
                loading={i > 1 ? "lazy" : "eager"}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
