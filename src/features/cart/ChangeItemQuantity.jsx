import { useSelector } from "react-redux";
import ChangeQuantityButton from "./ChangeQuantityButton";
import { getCartItemQuantity } from "./cartSlice";

function ChangeItemQuantity({ id }) {
  const quantity = useSelector(getCartItemQuantity(id));
  return (
    <div className="flex items-center gap-2">
      <ChangeQuantityButton id={id} action="dec">
        {" "}
        -
      </ChangeQuantityButton>
      <p>{quantity}</p>
      <ChangeQuantityButton id={id}>+</ChangeQuantityButton>
    </div>
  );
}

export default ChangeItemQuantity;
