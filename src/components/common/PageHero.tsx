import Reveal from "./Reveal";

type Props = { eyebrow: string; title: string; intro?: string; image?: string };

const PageHero = ({ eyebrow, title, intro, image }: Props) => (
  <section className="relative overflow-hidden pb-10 pt-36 md:pb-14 md:pt-44">
    {image && (
      <>
        <img src={image} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" aria-hidden />
      </>
    )}
    <div className="container-walk relative">
      <Reveal>
        <div className="mb-5 flex items-center gap-3">
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1 className="display max-w-5xl text-hero">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p>}
      </Reveal>
    </div>
  </section>
);

export default PageHero;
