import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartQuantity, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const quantity = useSelector(getCartQuantity);
  const price = useSelector(getTotalCartPrice);
  if (!quantity) return null;
  return (
    <div className=" flex items-center justify-between bg-stone-800 p-4 text-stone-200">
      <p className="space-x-4 text-stone-300">
        <span>
          {quantity} {`${quantity > 1 ? "pizzas" : "pizza"}`}
        </span>
        <span>${price}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
