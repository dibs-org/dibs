import { useMutation } from "@tanstack/react-query";

export const useConfirmOTP = () => {
  return useMutation({
    mutationFn: async ({ phone, code }: { phone: string; code: string }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { status: "success", phone, code } });
        }, 1000);
      });
    },
  });
};
