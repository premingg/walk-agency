import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/common/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import GeminiCard from "@/components/common/GeminiCard";
import { images, settings } from "@/data/site";

const Contact = () => (
  <>
    <PageHero eyebrow="Contact" title={"Tell us what\nyou're building"} image={images.hero4} />

    <section className="container-walk grid gap-10 py-12 lg:grid-cols-[1fr_1.2fr]">
      <div className="space-y-3 self-start">
        <GeminiCard
          index={0}
          radius="rounded-2xl"
          className="flex items-center gap-3 border border-border/70 bg-surface px-5 py-3.5 shadow-sm transition-shadow duration-300 group-hover:shadow-glass"
        >
          <MapPin className="h-5 w-5 shrink-0 text-brand-teal" />
          <p className="text-muted-foreground">{settings.address}</p>
        </GeminiCard>
        <GeminiCard
          index={1}
          radius="rounded-2xl"
          className="flex items-center gap-3 border border-border/70 bg-surface px-5 py-3.5 shadow-sm transition-shadow duration-300 group-hover:shadow-glass"
        >
          <Mail className="h-5 w-5 shrink-0 text-brand-teal" />
          <div className="flex flex-col">
            <a href={`mailto:${settings.email}`} className="text-muted-foreground hover:text-foreground">
              {settings.email}
            </a>
            <a href={`mailto:${settings.emailAlt}`} className="text-muted-foreground hover:text-foreground">
              {settings.emailAlt}
            </a>
          </div>
        </GeminiCard>
        <GeminiCard
          index={2}
          radius="rounded-2xl"
          className="flex items-center gap-3 border border-border/70 bg-surface px-5 py-3.5 shadow-sm transition-shadow duration-300 group-hover:shadow-glass"
        >
          <Phone className="h-5 w-5 shrink-0 text-brand-teal" />
          <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-foreground">
            {settings.phone}
          </a>
        </GeminiCard>
        <div className="flex flex-wrap gap-4 pt-2">
          {settings.socials.map((s) => (
            <a key={s.label} href={s.href} className="link-underline text-xs uppercase tracking-[0.2em]">
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="self-start">
        <SectionHeading eyebrow="Request a proposal" title="Start here" />
        <GeminiCard index={3} className="mt-8 border border-border/70 bg-surface p-6 shadow-glass transition-shadow duration-300 group-hover:shadow-cinema md:p-8">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Enquiry captured — submissions will land in the CMS lead inbox in phase two.");
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Name" className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal" />
              <input required placeholder="Company" className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal" />
              <input required type="email" placeholder="Email" className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal" />
              <input placeholder="Phone" className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal" />
            </div>
            <textarea required rows={5} placeholder="Tell us about the brief" className="rounded-xl border border-border bg-background px-4 py-4 outline-none focus:border-brand-teal" />
            <button type="submit" className="rounded-full border border-border px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brand-teal hover:text-brand-teal">
              Send enquiry
            </button>
          </form>
        </GeminiCard>
      </div>
    </section>


    <section>
      <iframe
        title="WALK Experiential office location"
        src={`https://www.google.com/maps?q=${settings.mapQuery}&output=embed`}
        loading="lazy"
        className="h-[420px] w-full grayscale"
      />
    </section>
  </>
);

export default Contact;
