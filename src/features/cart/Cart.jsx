import { Link } from "react-router-dom";
import BackButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart } from "./cartSlice";
import { getUser } from "../user/userSlice";

function Cart() {
  const { name } = useSelector(getUser);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  function handleClearCart() {
    dispatch(deleteCart());
  }

  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="font-xl my-7 text-xl font-semibold">Your cart, {name}</h2>

      <ul className="divide-y-2 border-b-2">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-7 space-x-3">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
