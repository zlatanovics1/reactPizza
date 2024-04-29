import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteCartItem } from "./cartSlice";

function DeleteItem({ id }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteCartItem(id))}>
      delete
    </Button>
  );
}

export default DeleteItem;
