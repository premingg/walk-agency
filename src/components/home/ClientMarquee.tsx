import { useClientLogos } from "@/hooks/useContent";

/**
 * Two bare, colourful infinite client-logo loops (top slides left, bottom slides right).
 * No cards, no hover states — just the logos, full colour, always visible.
 * Logos are managed in /walk-manager.
 */
const ClientMarquee = () => {
  const { data: clients = [] } = useClientLogos();
  const row = [...clients, ...clients, ...clients];

  const Track = ({ reverse = false }: { reverse?: boolean }) => (
    <div className="relative overflow-hidden py-4">
      <div className={`flex w-max items-center gap-14 pr-14 md:gap-20 md:pr-20 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {row.map((c, i) => (
          <div
            key={`${c.id}-${i}-${reverse ? "rev" : "fwd"}`}
            className="flex h-16 w-32 shrink-0 items-center justify-center md:h-20 md:w-40"
          >
            {c.logo ? (
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="display bg-walk-gradient bg-clip-text text-2xl text-transparent md:text-3xl">{c.mark}</span>
            )}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-28" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-28" aria-hidden />
    </div>
  );

  if (!clients.length) return null;

  return (
    <div className="space-y-2">
      <Track />
      <Track reverse />
    </div>
  );
};

export default ClientMarquee;
