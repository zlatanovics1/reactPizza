import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, getUser } from "../user/userSlice";
import { deleteCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { PRIORITY_PERCENTAGE } from "../../config";
import store from "../../../store";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "loading";

  const formErrors = useActionData();

  const { name, address, status, position, error } = useSelector(getUser);

  const isLoading = status === "loading";

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (cart.length === 0) return <EmptyCart />;
  const priorityPrice = withPriority ? totalCartPrice * PRIORITY_PERCENTAGE : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const inputStyle =
    "flex flex-col sm:flex-row gap-6 mb-5 transition-all duration-300";

  function handleGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div>
      <h2 className="mt-5 text-xl font-bold ">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" className="mt-12 flex flex-col gap-8">
        <div className={`${inputStyle} sm:items-center `}>
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={name}
            required
            className="input grow"
          />
        </div>

        <div
          className={`${inputStyle} ${
            formErrors ? "sm:-translate-y-4" : "sm:items-center"
          } `}
        >
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={`${inputStyle} sm:items-center `}>
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              required
              disabled={isLoading}
              className="input relative w-full"
            />
            <Button type="absolute" onClick={handleGetPosition}>
              Get position
            </Button>
            {error && (
              <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className=" h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${(position.latitude, position.longitude)}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoading} type="primary">
            {isSubmitting
              ? "Submitting order..."
              : `Order now from ${formatCurrency(totalPrice)} `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
  };
  console.log(order);

  const errors = {};

  if (!isValidPhone(data.phone))
    errors.phone =
      "Please give us a correct phone number. We will need it in order to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(deleteCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
