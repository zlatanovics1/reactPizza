import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import Button from "../../ui/Button";

function ChangeQuantityButton({ id, action = "inc", children }) {
  const dispatch = useDispatch();
  const actions = {
    inc: () => dispatch(increaseItemQuantity(id)),
    dec: () => dispatch(decreaseItemQuantity(id)),
  };
  return (
    <Button type="round" onClick={actions[action]}>
      {children}
    </Button>
  );
}

export default ChangeQuantityButton;
