import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const makeAuthUserKey = () => ["authUser"];

export const useAuthUser = () => {
  return useQuery({
    queryKey: makeAuthUserKey(),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });
};
