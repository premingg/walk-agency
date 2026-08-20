CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt text NOT NULL DEFAULT '',
  project_slug text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hero_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hero_slides public read" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "hero_slides admin write" ON public.hero_slides FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER hero_slides_updated BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.client_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.client_logos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_logos TO authenticated;
GRANT ALL ON public.client_logos TO service_role;
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client_logos public read" ON public.client_logos FOR SELECT USING (true);
CREATE POLICY "client_logos admin write" ON public.client_logos FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER client_logos_updated BEFORE UPDATE ON public.client_logos FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.awards TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.awards TO authenticated;
GRANT ALL ON public.awards TO service_role;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "awards public read" ON public.awards FOR SELECT USING (true);
CREATE POLICY "awards admin write" ON public.awards FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER awards_updated BEFORE UPDATE ON public.awards FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  client_name text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Events',
  city text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  thumbnail_url text NOT NULL,
  detail_image_url text,
  overview text NOT NULL DEFAULT '',
  objective text NOT NULL DEFAULT '',
  approach text NOT NULL DEFAULT '',
  highlights text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects public read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "projects admin write" ON public.projects FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "site-media read" ON storage.objects FOR SELECT USING (bucket_id = 'site-media');
CREATE POLICY "site-media admin insert" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "site-media admin update" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "site-media admin delete" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));