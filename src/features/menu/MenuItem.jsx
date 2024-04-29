import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addCartItem, getCartItemQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import ChangeItemQuantity from "../cart/ChangeItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const quantity = useSelector(getCartItemQuantity(id));
  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispatch(addCartItem(newItem));
  }

  return (
    <li className="flex items-center gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-28 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col gap-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-medium  md:text-base">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className=" text-sm font-medium uppercase text-stone-500  md:text-base">
              Sold out
            </p>
          )}
          <div className="flex items-center gap-4">
            {quantity > 0 && <ChangeItemQuantity id={id} />}
            {quantity > 0 ? (
              <DeleteItem id={id} />
            ) : (
              !soldOut && (
                <Button
                  type="small"
                  disabled={soldOut}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
