import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { getEmailWithUsername, getProfileWithId } from "@/lib/repositories/profilesRepo";
import { UserProfile } from "@/types/User";

const supabase = createClient();

const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const enrichUserWithProfile = async (authUser: User): Promise<UserProfile> => {
    try {
      const profile = await getProfileWithId(supabase, authUser.id);

      return {
        id: profile.id || authUser.user_metadata?.id || "",
        username: profile?.username || authUser.user_metadata?.username || "",
        avatar_url: profile?.avatarurl || authUser.user_metadata?.avatar_url || "",
        email: profile?.email || authUser.user_metadata?.email || "",
        created_at: profile?.created_at || authUser.user_metadata?.created_at || "",
      };
    } catch (err) {
      console.error(err)
      return {
        id: authUser.user_metadata?.id || "",
        username: authUser.user_metadata?.username || "",
        avatar_url: authUser.user_metadata?.avatar_url || "",
        email: authUser.user_metadata?.email || "",
        created_at: authUser.user_metadata?.created_at || "",
      };
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          const fullUser = await enrichUserWithProfile(data.user);
          setUser(fullUser);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const fullUser = await enrichUserWithProfile(session.user);
        setUser(fullUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signUpNewUser = async (email: string, password: string, username: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/confirm',
        data: {
          username: username
        }
      },
    });
    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  const signInWithUsername = async (username: string, password: string) => {
    setLoading(true);
    const email = await getEmailWithUsername(supabase, username);
    if (!email) return Error;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
    return { data, error };
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (!error) setUser(null);
    if (error) setError(error.message);
    setLoading(false);
    return error;
  };

  return { user, loading, error, signUpNewUser, signInWithEmail, signInWithUsername, signOut };
};

export default useAuth;