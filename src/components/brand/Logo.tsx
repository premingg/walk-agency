import { Link } from "react-router-dom";
import { settings } from "@/data/site";
import logoSrc from "@/assets/walk-logo.png";

/** Official WALK wordmark. */
const Logo = ({ compact = false }: { compact?: boolean }) => (
  <Link to="/" aria-label={`${settings.short} — ${settings.tagline}`} className="inline-block">
    <img
      src={logoSrc}
      alt={`${settings.short} — ${settings.tagline}`}
      width={1920}
      height={470}
      className={compact ? "h-6 w-auto md:h-7" : "h-8 w-auto md:h-10"}
    />
  </Link>
);

export default Logo;
