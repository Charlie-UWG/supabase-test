import { createClient} from "@supabase/supabase-js"

const SUPABESE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABESE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if ( !SUPABESE_URL) {
  throw new Error("supabaseのURLが設定されていません。");
}
if ( !SUPABESE_KEY) {
  throw new Error("supabaseのAPI_KEYが設定されていません。");
}

export const client = createClient(SUPABESE_URL, SUPABESE_KEY);