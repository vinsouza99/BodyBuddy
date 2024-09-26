import PropTypes from 'prop-types';
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from './supabaseClient';

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
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
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