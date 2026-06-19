import { createBrowserClient } from "@supabase/ssr";
import { track } from "@/lib/analytics/events";

export const createClient = () => {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  if (typeof window !== "undefined") {
    const origSignIn = client.auth.signInWithPassword.bind(client.auth);
    client.auth.signInWithPassword = async (creds) => {
      const res = await origSignIn(creds);
      if (!res.error) track("login");
      return res;
    };
    const origSignUp = client.auth.signUp.bind(client.auth);
    client.auth.signUp = async (creds) => {
      const res = await origSignUp(creds);
      if (!res.error) track("signup");
      return res;
    };
  }
  return client;
};