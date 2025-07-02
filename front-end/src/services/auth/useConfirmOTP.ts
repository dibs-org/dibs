import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { makeAuthUserKey } from "./useAuthUserQuery";

export const useConfirmOTP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ phone, code }: { phone: string; code: string }) => {
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        phone: phone,
        token: code,
        type: "sms",
      });
      if (error) {
        throw error;
      }
      return session;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: makeAuthUserKey() });
    },
  });
};
