import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import { nav, footerNav, settings } from "@/data/site";

const Footer = () => (
  <footer className="border-t border-border bg-surface-2">
    <div className="container-walk grid gap-12 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
      <div>
        <Logo />
        <p className="mt-6 max-w-sm text-sm text-muted-foreground">
          Experiential marketing, events and activations. Built in Gurugram, delivered across India.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">{settings.address}</p>
      </div>

      <div>
        <h3 className="eyebrow mb-5">Explore</h3>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
          {[{ label: "Home", to: "/" }, ...nav, ...footerNav].map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="eyebrow mb-5">Connect</h3>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li>
            <a href={`mailto:${settings.email}`} className="transition-colors hover:text-foreground">
              {settings.email}
            </a>
          </li>
          <li>
            <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
              {settings.phone}
            </a>
          </li>
          {settings.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="transition-colors hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="container-walk flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
      <span>
        © {new Date().getFullYear()} {settings.name}
      </span>
      <span className="uppercase tracking-[0.24em]">{settings.tagline}</span>
    </div>
  </footer>
);

export default Footer;
