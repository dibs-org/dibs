import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./services/supabase";

const AuthContext = createContext<{ user: User | null }>({ user: null });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ?? null);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log("onAuthStateChange", event, session);
      if (event === "INITIAL_SESSION") {
        // handle initial session
        setUser(session?.user ?? null);
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        setUser(session?.user ?? null);
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        setUser(null);
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });
    // call unsubscribe to remove the callback
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // console.log("AuthProvider", { user });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
