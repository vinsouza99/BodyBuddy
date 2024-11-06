import PropTypes from "prop-types";
import { useState, useEffect, createContext, useContext } from "react";
import { getUserProgress, updateUserProgress } from "../controllers/UserController";
// import axios from "axios";
import axiosClient from "../utils/axiosClient";
import { sendTokenToServer } from "./authUtils";
import { supabase } from "./supabaseClient";
import { parseISO } from 'date-fns';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

// For sharing the user state across the app
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Retieve the session information from supabase
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) { throw error; }
        setUser(data?.session?.user ?? null);

        // Get login points (Once per day)
        console.log(data.session.user);
        if (data?.session?.user) {
          const lastSignInAt = data?.session?.user.last_sign_in_at;
          const dateInUTC = parseISO(lastSignInAt);
          const nowInUTC = new Date();
          const isDifferentDate = !(
              dateInUTC.getUTCFullYear() === nowInUTC.getUTCFullYear() &&
              dateInUTC.getUTCMonth() === nowInUTC.getUTCMonth() &&
              dateInUTC.getUTCDate() === nowInUTC.getUTCDate()
          );
          if (isDifferentDate) {
            let progress = await getUserProgress(user.id);
            if (!progress) {
              progress = { level_progress: 0 }; // Initialize with default values
            }
            const updatedProgress = { ...progress, level_progress: progress.level_progress + 5 };
            const response = await updateUserProgress(data.session.user.id, { level_progress: updatedProgress });
            console.log("User_Progress has been successfully updaed:", response.data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the user from supabase
    fetchSession();

    // Listener for changes on auth state
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // JWT token provided by supabase
      const access_token = session?.access_token;

      if (event === "INITIAL_SESSION") {
        // Handle initial session event
      } else if (event === "SIGNED_IN") {
        // Handle signed in event
        await sendTokenToServer(access_token);

        // Note: Code about coping user info to public.user table was replace with a trigger & function in the database
      } else if (event === "SIGNED_OUT") {
        // Handle sign out event
        setUser(null);
        console.log("User signed out");
      } else if (event === "PASSWORD_RECOVERY") {
        // Handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // Handle token refreshed event
        await sendTokenToServer(access_token);
        console.log("Access token refreshed");
      } else if (event === "USER_UPDATED") {
        // Handle user updated event
      }
    });

    // Cleanup
    return () => {
      if (data) data.subscription.unsubscribe();
    };
  }, []);

  // Sign out the user
  const handleSignOut = async () => {
    // Sign out from supabase autehtication
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      console.log("User signed out");
      setUser(null);
    } catch (error) {
      console.log("User failed to sign out", error);
      return;
    }

    // Clear the HTTP-Only cookie
    try {
      const response = await axiosClient.post("/clear-cookie");

      if (response.status === 200) {
        console.log("HTTP-Only cookie cleared successfully");
      } else {
        throw new Error("Failed to clear HTTP-Only cookie");
      }
    } catch (error) {
      console.error("Error clearing HTTP-Only cookie:", error);
    }
  };

  // NOTE: The following code moved to authUtils.js
  // Send the access token (JWT) to the server
  // const sendTokenToServer = async (access_token) => {
  //   if (access_token) {
  //     try {
  //       await axios.post(
  //         `${API_BASE_URL}set-cookie`,
  //         { access_token: access_token },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       console.log("Access token sent to server and cookie set.");
  //     } catch (error) {
  //       console.error("Error setting cookie:", error);
  //     }
  //   }
  // };

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
