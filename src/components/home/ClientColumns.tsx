import { clients, type Client } from "@/data/site";

const columns: Client[][] = [
  clients.slice(0, 5),
  clients.slice(5, 10),
  clients.slice(10),
];

const Tile = ({ c, i }: { c: Client; i: number }) => {
  const start = [0, 90, 180, 270][i % 4];
  return (
    <div className="group relative rounded-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Animated neon Gemini border */}
      <div
        className="absolute -inset-[2px] rounded-2xl overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "0 0 24px -4px rgba(66,133,244,0.35)" }}
      >
        <div
          className="absolute inset-[-150%] animate-[spin_4s_linear_infinite]"
          style={{
            background: `conic-gradient(from ${start}deg, #4285f4, #9b72cb, #d96570, #4285f4)`,
          }}
        />
      </div>

      <div className="relative z-10 grid h-24 place-items-center rounded-2xl border border-border/70 bg-surface shadow-sm transition-all duration-300 group-hover:shadow-glass">
        <span className="display bg-walk-gradient bg-clip-text text-2xl text-transparent opacity-60">{c.mark}</span>
      </div>
    </div>
  );
};

/** Three vertical, continuously looping columns of client logos. */
const ClientColumns = () => (
  <div className="grid h-[26rem] grid-cols-3 gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
    {columns.map((col, i) => (
      <div key={i} className={i % 2 === 0 ? "animate-marquee-y space-y-4" : "animate-marquee-y-rev space-y-4"}>
        {[...col, ...col, ...col].map((c, j) => (
          <Tile key={`${c.id}-${j}`} c={c} i={j} />
        ))}
      </div>
    ))}
  </div>
);

export default ClientColumns;
