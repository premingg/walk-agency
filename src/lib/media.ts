import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-media";
/** ~10 years — the bucket is private, so we store a long-lived signed URL. */
const SIGNED_TTL = 60 * 60 * 24 * 365 * 10;

/** Uploads an image to the media bucket and returns a public-facing URL. */
export const uploadMedia = async (file: File, folder: string) => {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_TTL);
  if (signError || !data?.signedUrl) throw signError ?? new Error("Could not create image URL");

  return data.signedUrl;
};
