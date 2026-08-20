import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/lib/media";
import { toast } from "sonner";
import Logo from "@/components/brand/Logo";

/* ---------------------------------- shared --------------------------------- */

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-brand-teal";
const btnClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-brand-blue hover:text-brand-blue disabled:opacity-50";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
    {children}
  </label>
);

/** Styled uploader: click or drag-and-drop, live preview, remove button. */
const ImagePicker = ({
  label,
  folder,
  value,
  onChange,
}: {
  label: string;
  folder: string;
  value: string;
  onChange: (url: string) => void;
}) => {
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    setBusy(true);
    try {
      onChange(await uploadMedia(file, folder));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label}>
      <div className="flex items-center gap-4">
        <div className="relative grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded-2xl border border-border bg-background">
          {value ? (
            <>
              <img src={value} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                aria-label="Remove image"
                className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-brand-red hover:text-brand-red"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <ImagePlus className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
          )}
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            void upload(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-1 cursor-pointer items-center gap-3 rounded-2xl border border-dashed px-5 py-5 text-sm transition-colors ${
            over ? "border-brand-teal bg-surface" : "border-border hover:border-brand-teal"
          }`}
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin text-brand-teal" /> : <Upload className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />}
          <span className="text-muted-foreground">
            {busy ? "Uploading…" : value ? "Replace image — click or drop a file" : "Click to choose or drop an image here"}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              void upload(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </Field>
  );
};


/* ----------------------------------- login ---------------------------------- */

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) toast.error(error.message);
  };

  return (
    <div className="grid min-h-[80svh] place-items-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-3xl border border-border bg-surface p-8 shadow-glass">
        <Logo compact />
        <h1 className="display text-2xl">WALK Manager</h1>
        <Field label="Email">
          <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        </Field>
        <Field label="Password">
          <input
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Field>
        <button className={btnClass} disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
      </form>
    </div>
  );
};

/* ------------------------------- generic table ------------------------------ */

type TableName =
  | "hero_slides"
  | "client_logos"
  | "awards"
  | "projects"
  | "site_stats"
  | "testimonials"
  | "team_members"
  | "faqs"
  | "job_openings"
  | "milestones";

const useRows = <T,>(table: TableName) =>
  useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });

const useRowMutations = (table: TableName) => {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", table] });
    qc.invalidateQueries({ queryKey: [table] });
  };

  const save = useMutation({
    mutationFn: async (row: Record<string, unknown>) => {
      const { error } = row.id
        ? await supabase.from(table).update(row as never).eq("id", row.id as string)
        : await supabase.from(table).insert(row as never);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { save, remove };
};

const Card = ({ children, onDelete }: { children: React.ReactNode; onDelete?: () => void }) => (
  <div className="relative space-y-4 rounded-3xl border border-border bg-surface p-6 shadow-sm">
    {onDelete && (
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete"
        className="absolute right-4 top-4 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-brand-red hover:text-brand-red"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    )}
    {children}
  </div>
);


const SaveButton = ({
  isNew,
  label,
  disabled,
  onClick,
}: {
  isNew?: boolean;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <button type="button" className={btnClass} disabled={disabled} onClick={onClick}>
    {isNew ? <Plus className="h-4 w-4" /> : null} {isNew ? `Add ${label}` : "Save"}
  </button>
);

/** Generic list: one "new" form on top, then every saved row. */
const Collection = <T,>({
  table,
  empty,
  Form,
}: {
  table: TableName;
  empty: T;
  Form: (props: FormProps<T>) => JSX.Element;
}) => {
  const { data: rows = [] } = useRows<T & { id: string }>(table);
  const { save, remove } = useRowMutations(table);
  const [newKey, setNewKey] = useState(0);

  return (
    <div className="space-y-6">
      <Form key={`new-${newKey}`} row={empty} isNew save={save} remove={remove} onAdded={() => setNewKey((k) => k + 1)} />
      {rows.map((r) => (
        <Form key={r.id} row={r} save={save} remove={remove} />
      ))}
    </div>
  );
};

/* --------------------------------- sections -------------------------------- */

type HeroRow = { id?: string; image_url: string; alt: string; project_slug: string | null; sort_order: number };

const emptyHero: HeroRow = { image_url: "", alt: "", project_slug: "", sort_order: 0 };

type FormProps<T> = {
  row: T;
  isNew?: boolean;
  save: ReturnType<typeof useRowMutations>["save"];
  remove: ReturnType<typeof useRowMutations>["remove"];
  onAdded?: () => void;
};

const HeroForm = ({ row, isNew, save, remove, onAdded }: FormProps<HeroRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<HeroRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <ImagePicker label="Hero image" folder="hero" value={state.image_url} onChange={(url) => set({ image_url: url })} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Image description">
          <input className={inputClass} value={state.alt} onChange={(e) => set({ alt: e.target.value })} />
        </Field>
        <Field label="Links to work slug">
          <input
            className={inputClass}
            placeholder="e.g. nationwide-launch"
            value={state.project_slug ?? ""}
            onChange={(e) => set({ project_slug: e.target.value })}
          />
        </Field>
        <Field label="Order">
          <input
            className={inputClass}
            type="number"
            value={state.sort_order}
            onChange={(e) => set({ sort_order: Number(e.target.value) })}
          />
        </Field>
      </div>
      <button
        type="button"
        className={btnClass}
        disabled={!state.image_url || save.isPending}
        onClick={() => {
          save.mutate({ ...state, project_slug: state.project_slug || null });
          if (isNew) onAdded?.();
        }}
      >
        {isNew ? <Plus className="h-4 w-4" /> : null} {isNew ? "Add slide" : "Save"}
      </button>
    </Card>
  );
};

const HeroSection = () => {
  const { data: rows = [] } = useRows<HeroRow>("hero_slides");
  const { save, remove } = useRowMutations("hero_slides");
  const [newKey, setNewKey] = useState(0);

  return (
    <div className="space-y-6">
      <HeroForm key={`new-${newKey}`} row={emptyHero} isNew save={save} remove={remove} onAdded={() => setNewKey((k) => k + 1)} />
      {rows.map((r) => (
        <HeroForm key={r.id} row={r} save={save} remove={remove} />
      ))}
    </div>
  );
};


type ClientRow = { id?: string; name: string; logo_url: string; sort_order: number };

const emptyClient: ClientRow = { name: "", logo_url: "", sort_order: 0 };

const ClientForm = ({ row, isNew, save, remove, onAdded }: FormProps<ClientRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<ClientRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <ImagePicker label="Company logo" folder="clients" value={state.logo_url} onChange={(url) => set({ logo_url: url })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company name">
          <input className={inputClass} value={state.name} onChange={(e) => set({ name: e.target.value })} />
        </Field>
        <Field label="Order">
          <input
            className={inputClass}
            type="number"
            value={state.sort_order}
            onChange={(e) => set({ sort_order: Number(e.target.value) })}
          />
        </Field>
      </div>
      <button
        type="button"
        className={btnClass}
        disabled={!state.name || !state.logo_url || save.isPending}
        onClick={() => {
          save.mutate({ ...state });
          if (isNew) onAdded?.();
        }}
      >
        {isNew ? <Plus className="h-4 w-4" /> : null} {isNew ? "Add client" : "Save"}
      </button>
    </Card>
  );
};

const ClientsSection = () => {
  const { data: rows = [] } = useRows<ClientRow>("client_logos");
  const { save, remove } = useRowMutations("client_logos");
  const [newKey, setNewKey] = useState(0);

  return (
    <div className="space-y-6">
      <ClientForm key={`new-${newKey}`} row={emptyClient} isNew save={save} remove={remove} onAdded={() => setNewKey((k) => k + 1)} />
      {rows.map((r) => (
        <ClientForm key={r.id} row={r} save={save} remove={remove} />
      ))}
    </div>
  );
};


type AwardRow = { id?: string; title: string; body: string; year: string; sort_order: number };

const emptyAward: AwardRow = { title: "", body: "", year: "", sort_order: 0 };

const AwardForm = ({ row, isNew, save, remove, onAdded }: FormProps<AwardRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<AwardRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Award title">
          <input className={inputClass} value={state.title} onChange={(e) => set({ title: e.target.value })} />
        </Field>
        <Field label="Year">
          <input className={inputClass} value={state.year} onChange={(e) => set({ year: e.target.value })} />
        </Field>
        <Field label="Order">
          <input
            className={inputClass}
            type="number"
            value={state.sort_order}
            onChange={(e) => set({ sort_order: Number(e.target.value) })}
          />
        </Field>
      </div>
      <Field label="Description">
        <textarea className={inputClass} rows={2} value={state.body} onChange={(e) => set({ body: e.target.value })} />
      </Field>
      <button
        type="button"
        className={btnClass}
        disabled={!state.title || save.isPending}
        onClick={() => {
          save.mutate({ ...state });
          if (isNew) onAdded?.();
        }}
      >
        {isNew ? <Plus className="h-4 w-4" /> : null} {isNew ? "Add award" : "Save"}
      </button>
    </Card>
  );
};

const AwardsSection = () => {
  const { data: rows = [] } = useRows<AwardRow>("awards");
  const { save, remove } = useRowMutations("awards");
  const [newKey, setNewKey] = useState(0);

  return (
    <div className="space-y-6">
      <AwardForm key={`new-${newKey}`} row={emptyAward} isNew save={save} remove={remove} onAdded={() => setNewKey((k) => k + 1)} />
      {rows.map((r) => (
        <AwardForm key={r.id} row={r} save={save} remove={remove} />
      ))}
    </div>
  );
};


type ProjectRow = {
  id?: string;
  slug: string;
  title: string;
  client_name: string;
  category: string;
  city: string;
  year: string;
  thumbnail_url: string;
  detail_image_url: string | null;
  overview: string;
  objective: string;
  approach: string;
  highlights: string[];
  featured: boolean;
  sort_order: number;
};

const emptyProject: ProjectRow = {
  slug: "",
  title: "",
  client_name: "",
  category: "Events",
  city: "",
  year: "",
  thumbnail_url: "",
  detail_image_url: "",
  overview: "",
  objective: "",
  approach: "",
  highlights: [],
  featured: false,
  sort_order: 0,
};

const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const WorkForm = ({ row, isNew, save, remove, onAdded }: FormProps<ProjectRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<ProjectRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <div className="grid gap-4 md:grid-cols-2">
        <ImagePicker
          label="Thumbnail image (listing + hero)"
          folder="work"
          value={state.thumbnail_url}
          onChange={(url) => set({ thumbnail_url: url })}
        />
        <ImagePicker
          label="Detail image (project page)"
          folder="work"
          value={state.detail_image_url ?? ""}
          onChange={(url) => set({ detail_image_url: url })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Project title">
          <input
            className={inputClass}
            value={state.title}
            onChange={(e) => set({ title: e.target.value, slug: isNew ? slugify(e.target.value) : state.slug })}
          />
        </Field>
        <Field label="Page address (slug)">
          <input className={inputClass} value={state.slug} onChange={(e) => set({ slug: slugify(e.target.value) })} />
        </Field>
        <Field label="Client">
          <input className={inputClass} value={state.client_name} onChange={(e) => set({ client_name: e.target.value })} />
        </Field>
        <Field label="Category">
          <input className={inputClass} value={state.category} onChange={(e) => set({ category: e.target.value })} />
        </Field>
        <Field label="City">
          <input className={inputClass} value={state.city} onChange={(e) => set({ city: e.target.value })} />
        </Field>
        <Field label="Year">
          <input className={inputClass} value={state.year} onChange={(e) => set({ year: e.target.value })} />
        </Field>
      </div>
      <Field label="Overview">
        <textarea className={inputClass} rows={2} value={state.overview} onChange={(e) => set({ overview: e.target.value })} />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Client objective">
          <textarea className={inputClass} rows={2} value={state.objective} onChange={(e) => set({ objective: e.target.value })} />
        </Field>
        <Field label="Our approach">
          <textarea className={inputClass} rows={2} value={state.approach} onChange={(e) => set({ approach: e.target.value })} />
        </Field>
      </div>
      <Field label="Execution highlights (one per line)">
        <textarea
          className={inputClass}
          rows={3}
          value={state.highlights.join("\n")}
          onChange={(e) => set({ highlights: e.target.value.split("\n") })}
        />
      </Field>
      <div className="flex flex-wrap items-end gap-6">
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={state.featured} onChange={(e) => set({ featured: e.target.checked })} />
          Show on home page
        </label>
        <Field label="Order">
          <input
            className={inputClass}
            type="number"
            value={state.sort_order}
            onChange={(e) => set({ sort_order: Number(e.target.value) })}
          />
        </Field>
      </div>
      <button
        type="button"
        className={btnClass}
        disabled={!state.title || !state.slug || !state.thumbnail_url || save.isPending}
        onClick={() => {
          save.mutate({
            ...state,
            highlights: state.highlights.filter((l) => l.trim() !== ""),
            detail_image_url: state.detail_image_url || null,
          });
          if (isNew) onAdded?.();
        }}
      >
        {isNew ? <Plus className="h-4 w-4" /> : null} {isNew ? "Add work" : "Save"}
      </button>
    </Card>
  );
};

const WorkSection = () => {
  const { data: rows = [] } = useRows<ProjectRow>("projects");
  const { save, remove } = useRowMutations("projects");
  const [newKey, setNewKey] = useState(0);

  return (
    <div className="space-y-6">
      <WorkForm key={`new-${newKey}`} row={emptyProject} isNew save={save} remove={remove} onAdded={() => setNewKey((k) => k + 1)} />
      {rows.map((r) => (
        <WorkForm key={r.id} row={r} save={save} remove={remove} />
      ))}
    </div>
  );
};



/* --------------------------- stats / testimonials --------------------------- */

type StatRow = { id?: string; label: string; value: number; suffix: string; sort_order: number };
const emptyStat: StatRow = { label: "", value: 0, suffix: "+", sort_order: 0 };

const StatForm = ({ row, isNew, save, remove, onAdded }: FormProps<StatRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<StatRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Label">
          <input className={inputClass} value={state.label} onChange={(e) => set({ label: e.target.value })} />
        </Field>
        <Field label="Number">
          <input className={inputClass} type="number" value={state.value} onChange={(e) => set({ value: Number(e.target.value) })} />
        </Field>
        <Field label="Suffix">
          <input className={inputClass} value={state.suffix} onChange={(e) => set({ suffix: e.target.value })} />
        </Field>
        <Field label="Order">
          <input className={inputClass} type="number" value={state.sort_order} onChange={(e) => set({ sort_order: Number(e.target.value) })} />
        </Field>
      </div>
      <SaveButton isNew={isNew} label="stat" disabled={!state.label || save.isPending} onClick={() => { save.mutate({ ...state }); if (isNew) onAdded?.(); }} />
    </Card>
  );
};

const StatsSection = () => <Collection table="site_stats" empty={emptyStat} Form={StatForm} />;

type TestimonialRow = { id?: string; quote: string; author: string; role: string; avatar_url: string | null; sort_order: number };
const emptyTestimonial: TestimonialRow = { quote: "", author: "", role: "", avatar_url: "", sort_order: 0 };

const TestimonialForm = ({ row, isNew, save, remove, onAdded }: FormProps<TestimonialRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<TestimonialRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <ImagePicker label="Photo (optional)" folder="testimonials" value={state.avatar_url ?? ""} onChange={(url) => set({ avatar_url: url })} />
      <Field label="Quote">
        <textarea className={inputClass} rows={3} value={state.quote} onChange={(e) => set({ quote: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Author">
          <input className={inputClass} value={state.author} onChange={(e) => set({ author: e.target.value })} />
        </Field>
        <Field label="Designation, company">
          <input className={inputClass} value={state.role} onChange={(e) => set({ role: e.target.value })} />
        </Field>
        <Field label="Order">
          <input className={inputClass} type="number" value={state.sort_order} onChange={(e) => set({ sort_order: Number(e.target.value) })} />
        </Field>
      </div>
      <SaveButton isNew={isNew} label="testimonial" disabled={!state.quote || save.isPending} onClick={() => { save.mutate({ ...state, avatar_url: state.avatar_url || null }); if (isNew) onAdded?.(); }} />
    </Card>
  );
};

const TestimonialsSection = () => <Collection table="testimonials" empty={emptyTestimonial} Form={TestimonialForm} />;

/* -------------------------------- team / faqs ------------------------------- */

type TeamRow = { id?: string; name: string; title: string; photo_url: string | null; linkedin_url: string | null; sort_order: number };
const emptyTeam: TeamRow = { name: "", title: "", photo_url: "", linkedin_url: "", sort_order: 0 };

const TeamForm = ({ row, isNew, save, remove, onAdded }: FormProps<TeamRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<TeamRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <ImagePicker label="Photo" folder="team" value={state.photo_url ?? ""} onChange={(url) => set({ photo_url: url })} />
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Name">
          <input className={inputClass} value={state.name} onChange={(e) => set({ name: e.target.value })} />
        </Field>
        <Field label="Designation">
          <input className={inputClass} value={state.title} onChange={(e) => set({ title: e.target.value })} />
        </Field>
        <Field label="LinkedIn URL">
          <input className={inputClass} value={state.linkedin_url ?? ""} onChange={(e) => set({ linkedin_url: e.target.value })} />
        </Field>
        <Field label="Order">
          <input className={inputClass} type="number" value={state.sort_order} onChange={(e) => set({ sort_order: Number(e.target.value) })} />
        </Field>
      </div>
      <SaveButton isNew={isNew} label="member" disabled={!state.name || save.isPending} onClick={() => { save.mutate({ ...state, photo_url: state.photo_url || null, linkedin_url: state.linkedin_url || null }); if (isNew) onAdded?.(); }} />
    </Card>
  );
};

const TeamSection = () => <Collection table="team_members" empty={emptyTeam} Form={TeamForm} />;

type FaqRow = { id?: string; question: string; answer: string; sort_order: number };
const emptyFaq: FaqRow = { question: "", answer: "", sort_order: 0 };

const FaqForm = ({ row, isNew, save, remove, onAdded }: FormProps<FaqRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<FaqRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
        <Field label="Question">
          <input className={inputClass} value={state.question} onChange={(e) => set({ question: e.target.value })} />
        </Field>
        <Field label="Order">
          <input className={inputClass} type="number" value={state.sort_order} onChange={(e) => set({ sort_order: Number(e.target.value) })} />
        </Field>
      </div>
      <Field label="Answer">
        <textarea className={inputClass} rows={3} value={state.answer} onChange={(e) => set({ answer: e.target.value })} />
      </Field>
      <SaveButton isNew={isNew} label="question" disabled={!state.question || save.isPending} onClick={() => { save.mutate({ ...state }); if (isNew) onAdded?.(); }} />
    </Card>
  );
};

const FaqsSection = () => <Collection table="faqs" empty={emptyFaq} Form={FaqForm} />;

/* ----------------------------- jobs / milestones ---------------------------- */

type JobRow = { id?: string; title: string; location: string; job_type: string; description: string; sort_order: number };
const emptyJob: JobRow = { title: "", location: "Gurugram", job_type: "Full time", description: "", sort_order: 0 };

const JobForm = ({ row, isNew, save, remove, onAdded }: FormProps<JobRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<JobRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Role title">
          <input className={inputClass} value={state.title} onChange={(e) => set({ title: e.target.value })} />
        </Field>
        <Field label="Location">
          <input className={inputClass} value={state.location} onChange={(e) => set({ location: e.target.value })} />
        </Field>
        <Field label="Type">
          <input className={inputClass} value={state.job_type} onChange={(e) => set({ job_type: e.target.value })} />
        </Field>
        <Field label="Order">
          <input className={inputClass} type="number" value={state.sort_order} onChange={(e) => set({ sort_order: Number(e.target.value) })} />
        </Field>
      </div>
      <Field label="Description">
        <textarea className={inputClass} rows={2} value={state.description} onChange={(e) => set({ description: e.target.value })} />
      </Field>
      <SaveButton isNew={isNew} label="role" disabled={!state.title || save.isPending} onClick={() => { save.mutate({ ...state }); if (isNew) onAdded?.(); }} />
    </Card>
  );
};

const JobsSection = () => <Collection table="job_openings" empty={emptyJob} Form={JobForm} />;

type MilestoneRow = { id?: string; year: string; title: string; body: string; sort_order: number };
const emptyMilestone: MilestoneRow = { year: "", title: "", body: "", sort_order: 0 };

const MilestoneForm = ({ row, isNew, save, remove, onAdded }: FormProps<MilestoneRow>) => {
  const [state, setState] = useState(row);
  const set = (patch: Partial<MilestoneRow>) => setState((s) => ({ ...s, ...patch }));

  return (
    <Card onDelete={row.id ? () => remove.mutate(row.id!) : undefined}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Year / label">
          <input className={inputClass} value={state.year} onChange={(e) => set({ year: e.target.value })} />
        </Field>
        <Field label="Title">
          <input className={inputClass} value={state.title} onChange={(e) => set({ title: e.target.value })} />
        </Field>
        <Field label="Order">
          <input className={inputClass} type="number" value={state.sort_order} onChange={(e) => set({ sort_order: Number(e.target.value) })} />
        </Field>
      </div>
      <Field label="Description">
        <textarea className={inputClass} rows={2} value={state.body} onChange={(e) => set({ body: e.target.value })} />
      </Field>
      <SaveButton isNew={isNew} label="milestone" disabled={!state.title || save.isPending} onClick={() => { save.mutate({ ...state }); if (isNew) onAdded?.(); }} />
    </Card>
  );
};

const MilestonesSection = () => <Collection table="milestones" empty={emptyMilestone} Form={MilestoneForm} />;


/* ---------------------------------- shell ---------------------------------- */


const TABS = [
  { id: "hero", label: "Hero images" },
  { id: "clients", label: "Client logos" },
  { id: "work", label: "Our work" },
  { id: "awards", label: "Awards" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Testimonials" },
  { id: "team", label: "Team" },
  { id: "faqs", label: "FAQs" },
  { id: "jobs", label: "Careers" },
  { id: "milestones", label: "Milestones" },
] as const;

const Manager = () => {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("hero");

  return (
    <div className="container-walk py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-3xl">WALK Manager</h1>
        <button type="button" className={btnClass} onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors ${
              tab === t.id ? "border-brand-teal text-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "hero" && <HeroSection />}
        {tab === "clients" && <ClientsSection />}
        {tab === "work" && <WorkSection />}
        {tab === "awards" && <AwardsSection />}
        {tab === "stats" && <StatsSection />}
        {tab === "testimonials" && <TestimonialsSection />}
        {tab === "team" && <TeamSection />}
        {tab === "faqs" && <FaqsSection />}
        {tab === "jobs" && <JobsSection />}
        {tab === "milestones" && <MilestonesSection />}
      </div>
    </div>
  );
};

const WalkManager = () => {
  const { data: session, isLoading } = useQuery({
    queryKey: ["admin-session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return null;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return { user: data.session.user, isAdmin: !!roles };
    },
  });

  const qc = useQueryClient();
  useState(() => {
    supabase.auth.onAuthStateChange(() => qc.invalidateQueries({ queryKey: ["admin-session"] }));
  });

  if (isLoading) return <div className="min-h-[70svh]" />;
  if (!session) return <Login />;
  if (!session.isAdmin)
    return (
      <div className="grid min-h-[70svh] place-items-center px-6 text-center">
        <div>
          <h1 className="display text-3xl">Not an admin account</h1>
          <button type="button" className={`${btnClass} mt-6`} onClick={() => supabase.auth.signOut()}>
            Sign out
          </button>
        </div>
      </div>
    );

  return <Manager />;
};

export default WalkManager;
