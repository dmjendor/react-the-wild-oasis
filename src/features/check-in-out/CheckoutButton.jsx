import Button from "../../ui/Button";
import { useCheckout } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
