import PropTypes from "prop-types";
import { useState, useEffect, createContext, useContext } from "react";
import {
  getUserProgress,
  updateUserProgress,
} from "../controllers/UserController";
import { supabase } from "./supabaseClient";
import { parseISO } from "date-fns";

// For sharing the user state across the app
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retrieve the session information
  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        const session = data?.session;
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the user from supabase
    fetchSession();

    // Listener for changes on auth state
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      // JWT token provided by supabase
      const access_token = session?.access_token;

      if (event === "INITIAL_SESSION") {
      } else if (event === "SIGNED_IN" && access_token) {
        setUser(session?.user ?? null);
        setLoading(false);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      } else if (event === "TOKEN_REFRESHED") {
        console.log("Access token refreshed");
      }
    });

    // Cleanup
    return () => {
      if (data) data.subscription.unsubscribe();
    };
  }, []);

  // Note:
  // This function doesn' work because last_sign_in_at is already update when the user is signed in
  useEffect(() => {
    if (user) {
      const checkDailyLoginPoints = async () => {
        const lastSignInAt = user.last_sign_in_at;
        if (lastSignInAt && isDifferentDate(lastSignInAt)) {
          let progress = (await getUserProgress(user.id)) ?? {
            level_progress: 0,
          };
          const updatedProgress = {
            ...progress,
            level_progress: progress.level_progress + 5,
          };
          await updateUserProgress(user.id, updatedProgress);
        }
      };
      checkDailyLoginPoints();
    }
  }, [user]);

  const isDifferentDate = (lastSignInAt) => {
    const lastSignInUTC = parseISO(lastSignInAt);
    const now = new Date();

    const yesterday = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1)
    );
    return lastSignInUTC <= yesterday;
  };

  // Sign out the user
  const handleSignOut = async () => {
    // Sign out from supabase autehtication
    try {
      // Check if there is an active session
      const { data: session, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !session) {
        console.log("No active session found. Clearing user state.");
        setUser(null);
        window.localStorage.clear();
        return;
      }

      // Sign out the user
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
    } catch (error) {
      console.error("User failed to sign out", error);
      setUser(null);
      window.localStorage.clear();
      return;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
