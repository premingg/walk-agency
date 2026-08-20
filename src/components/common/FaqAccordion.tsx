import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useFaqs } from "@/hooks/useContent";

/** Managed FAQ list — rows expand on click anywhere. */
const FaqAccordion = () => {
  const { data: faqs = [] } = useFaqs();
  const [open, setOpen] = useState<string | null>(null);

  if (!faqs.length) return null;

  return (
    <div>
      {faqs.map((f, i) => {
        const isOpen = open === f.id;
        return (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border/70 last:border-b"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : f.id)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-5 py-5 text-left"
            >
              <span className="w-8 shrink-0 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display flex-1 text-lg transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
                {f.question}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500 ${isOpen ? "rotate-45 text-brand-teal" : ""}`}
              />
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl pb-6 pl-[3.25rem] text-sm text-muted-foreground">{f.answer}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
