import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiOutlineLogout } from "react-icons/hi";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon onClick={() => logout()}>
      {!isLoading ? <HiOutlineLogout /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
