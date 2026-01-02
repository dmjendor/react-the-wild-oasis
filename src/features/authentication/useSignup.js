import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: () => signupApi,
    onSuccess: (user) => {
      toast.success(
        "User was successfully created, \r\nPlease verify the new account from the users email address."
      );
    },
    onError: (err) => {
      console.error(err);
      throw new Error(err);
    },
  });

  return { signup, isLoading };
}
