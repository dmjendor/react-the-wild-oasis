import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

// Abstracted react query into custom hook
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { status, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error("Cabin was not able to be deleted.");
      throw new Error(err);
    },
  });
  const isDeleting = status === "loading";
  return { isDeleting, deleteCabin };
}
