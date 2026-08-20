import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/brand/Logo";
import { nav, footerNav } from "@/data/site";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 md:top-5">
      <div className="container-walk">
        <div
          className={cn(
            "glass relative flex items-center justify-between gap-6 rounded-full px-4 py-2.5 transition-all duration-300 md:px-6 md:py-3",
            scrolled && "bg-white/75",
          )}
        >
          <Logo compact />

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "link-underline text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass mt-3 overflow-hidden rounded-3xl lg:hidden"
            >
              <nav className="flex flex-col p-5" aria-label="Mobile">
                {[...nav, ...footerNav].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="display border-b border-border/60 py-3 text-2xl text-foreground last:border-0"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
