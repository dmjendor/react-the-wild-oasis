import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

// Abstracted react query into custom hook
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { status, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error("Booking was not able to be deleted.");
      throw new Error(err);
    },
  });
  const isDeleting = status === "loading";
  return { isDeleting, deleteBooking };
}
