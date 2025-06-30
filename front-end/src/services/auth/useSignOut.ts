import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { makeAuthUserKey } from "./useAuthUser";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: makeAuthUserKey() });
    },
  });
};
