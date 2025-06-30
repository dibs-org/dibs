import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase";

export const useSendOTP = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
