import PropTypes from 'prop-types';
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './supabaseClient';
import { default as server } from "./ProxyServer.js";

// For sharing the user state across the app
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          throw error;
        }
        setUser(data?.session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch the user from supabase
    fetchSession();

    // Listener for changes on auth state
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      setUser(session?.user ?? null);
      setLoading(false);
    
      if (event === 'INITIAL_SESSION') {
        // Handle initial session event
      } else if (event === 'SIGNED_IN') {   
        // Handle signed in event     
        
        // If this is the first sign-in, add info to custom user table
        console.log(session.user.id);
        server.get("users", session.user.id)
          .then((response) => {
            console.log("User already exists in the custom user table", response);
          }).catch((error) => {
            if (error.response.status === 404) {
              // In case of 404 error, add user to custom user table (= New user)
              const newAccountObj = {
                id: session.user.id,
                first_name: "",
                last_name: "",
              };
              server.add("users", newAccountObj)
                .then((response) => {
                  console.log("SUCCESS: User signed up (Custom user table)", response);
                })
                .catch((error) => {
                  console.log("ERROR: User signed up (Custom user table)", error);
                });
            } else {
              // Other than 404 error
              console.log("ERROR: Checking user existence in custom user table", error);
            }
          }
        );
      } else if (event === 'SIGNED_OUT') {
        // Handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // Handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // Handle user updated event
      }
    })
    
    // Cleanup
    return () => {
      if (data) data.subscription.unsubscribe()
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error;
      }
      console.log('SUCCESS: User signed out');
    } catch (error) {
      console.log('ERROR: User signed up', error);
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