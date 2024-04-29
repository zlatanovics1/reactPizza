import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          className="input bg-yellow-100 sm:focus:w-72"
          placeholder="Search an order"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}

//eslint-disable-next-line
export async function loader({ params }) {
  return await getOrder(params.orderId);
}

export default SearchOrder;
