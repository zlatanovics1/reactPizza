import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

function Header() {
  return (
    <header className=" flex items-center justify-between border-b border-b-slate-200 bg-yellow-500 p-4 uppercase tracking-widest">
      <Link to="/">Fast React Pizza</Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
