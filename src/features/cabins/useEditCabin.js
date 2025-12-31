import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, status: editStatus } = useMutation({
    mutationFn: ({ newCabinData, editId }) =>
      createEditCabin(newCabinData, editId),
    onSuccess: () => {
      toast.success("New cabin successfully edited.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const isEditing = editStatus === "loading";
  return { editCabin, isEditing };
}
