import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  awards as staticAwards,
  clients as staticClients,
  heroSlides as staticHeroSlides,
  projects as staticProjects,
  stats as staticStats,
  testimonials as staticTestimonials,
  timeline as staticTimeline,
  jobs as staticJobs,
} from "@/data/site";

/**
 * Content layer.
 * Everything below reads from Lovable Cloud (managed in /walk-manager).
 * While a collection is still empty, the original placeholder content is shown
 * so the site never renders blank.
 */

export type HeroSlideItem = { id: string; image: string; alt: string; to: string };
export type ClientLogoItem = { id: string; name: string; logo: string | null; mark: string };
export type AwardItem = { id: string; title: string; body: string; year: string };
export type WorkItem = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  city: string;
  year: string;
  image: string;
  detailImage: string;
  overview: string;
  objective: string;
  approach: string;
  highlights: string[];
  featured: boolean;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const useHeroSlides = () =>
  useQuery({
    queryKey: ["hero_slides"],
    queryFn: async (): Promise<HeroSlideItem[]> => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length) {
        return staticHeroSlides.map((s) => ({
          id: s.id,
          image: s.image,
          alt: s.title.replace(/\n/g, " "),
          to: s.to,
        }));
      }
      return data.map((s) => ({
        id: s.id,
        image: s.image_url,
        alt: s.alt || "WALK experience",
        to: s.project_slug ? `/work/${s.project_slug}` : "/work",
      }));
    },
  });

export const useClientLogos = () =>
  useQuery({
    queryKey: ["client_logos"],
    queryFn: async (): Promise<ClientLogoItem[]> => {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length) {
        return staticClients.map((c) => ({ id: c.id, name: c.name, logo: null, mark: c.mark }));
      }
      return data.map((c) => ({ id: c.id, name: c.name, logo: c.logo_url, mark: initials(c.name) }));
    },
  });

export const useAwards = () =>
  useQuery({
    queryKey: ["awards"],
    queryFn: async (): Promise<AwardItem[]> => {
      const { data, error } = await supabase.from("awards").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length) return staticAwards.map((a) => ({ id: a.id, title: a.title, body: a.body, year: a.year }));
      return data.map((a) => ({ id: a.id, title: a.title, body: a.body, year: a.year }));
    },
  });

export const useWork = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<WorkItem[]> => {
      const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length) {
        return staticProjects.map((p) => ({
          id: p.slug,
          slug: p.slug,
          title: p.title,
          client: p.client,
          category: p.category,
          city: p.city,
          year: p.year,
          image: p.image,
          detailImage: p.gallery[1] ?? p.image,
          overview: p.overview,
          objective: p.objective,
          approach: p.approach,
          highlights: p.highlights,
          featured: p.featured,
        }));
      }
      return data.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        client: p.client_name,
        category: p.category,
        city: p.city,
        year: p.year,
        image: p.thumbnail_url,
        detailImage: p.detail_image_url || p.thumbnail_url,
        overview: p.overview,
        objective: p.objective,
        approach: p.approach,
        highlights: p.highlights ?? [],
        featured: p.featured,
      }));
    },
  });

/* ------------------------- extra managed collections ------------------------ */

export type StatItem = { id: string; label: string; value: number; suffix: string; note?: string };
export type TestimonialItem = { id: string; quote: string; author: string; role: string; avatar: string | null };
export type TeamItem = { id: string; name: string; title: string; photo: string | null; linkedin: string | null };
export type FaqItem = { id: string; question: string; answer: string };
export type JobItem = { id: string; title: string; location: string; type: string; description: string };
export type MilestoneItem = { id: string; year: string; title: string; body: string };

export const useStats = () =>
  useQuery({
    queryKey: ["site_stats"],
    queryFn: async (): Promise<StatItem[]> => {
      const { data, error } = await supabase.from("site_stats").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length)
        return staticStats.map((s, i) => ({ id: `s-${i}`, label: s.label, value: s.value, suffix: s.suffix }));
      return data.map((s) => ({ id: s.id, label: s.label, value: s.value, suffix: s.suffix }));
    },
  });

export const useTestimonials = () =>
  useQuery({
    queryKey: ["testimonials"],
    queryFn: async (): Promise<TestimonialItem[]> => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length)
        return staticTestimonials.map((t) => ({ id: t.id, quote: t.quote, author: t.author, role: t.role, avatar: null }));
      return data.map((t) => ({ id: t.id, quote: t.quote, author: t.author, role: t.role, avatar: t.avatar_url }));
    },
  });

export const useTeam = () =>
  useQuery({
    queryKey: ["team_members"],
    queryFn: async (): Promise<TeamItem[]> => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((m) => ({
        id: m.id,
        name: m.name,
        title: m.title,
        photo: m.photo_url,
        linkedin: m.linkedin_url,
      }));
    },
  });

export const useFaqs = () =>
  useQuery({
    queryKey: ["faqs"],
    queryFn: async (): Promise<FaqItem[]> => {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((f) => ({ id: f.id, question: f.question, answer: f.answer }));
    },
  });

export const useJobs = () =>
  useQuery({
    queryKey: ["job_openings"],
    queryFn: async (): Promise<JobItem[]> => {
      const { data, error } = await supabase.from("job_openings").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length)
        return staticJobs.map((j) => ({ id: j.id, title: j.title, location: j.location, type: j.type, description: "" }));
      return data.map((j) => ({
        id: j.id,
        title: j.title,
        location: j.location,
        type: j.job_type,
        description: j.description,
      }));
    },
  });

export const useMilestones = () =>
  useQuery({
    queryKey: ["milestones"],
    queryFn: async (): Promise<MilestoneItem[]> => {
      const { data, error } = await supabase.from("milestones").select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      if (!data?.length)
        return staticTimeline.map((t, i) => ({ id: `m-${i}`, year: t.year, title: t.title, body: t.body }));
      return data.map((m) => ({ id: m.id, year: m.year, title: m.title, body: m.body }));
    },
  });
