import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import ChangeItemQuantity from "./ChangeItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="space-y-2 py-3 md:flex md:items-center md:justify-between">
      <p>
        <span className="font-semibold">{quantity}&times;</span>{" "}
        <span>{name}</span>
      </p>

      <div className="flex items-center  justify-between md:gap-6">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <ChangeItemQuantity id={pizzaId} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
