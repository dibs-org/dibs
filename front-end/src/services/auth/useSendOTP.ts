import { useMutation } from "@tanstack/react-query";

export const useSendOTP = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { phone, code: "123456" } });
        }, 1000);
      });
    },
  });
};
