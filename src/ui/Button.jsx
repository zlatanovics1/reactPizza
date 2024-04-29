import { Link } from "react-router-dom";

function Button({
  children,
  to,
  type,
  disabled = false,
  onClick = () => null,
}) {
  const baseStyle =
    " uppercase text-sm disabled:cursor-not-allowed inline-block rounded-full bg-yellow-400  font-semibold  text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed ";
  const style = {
    primary: baseStyle + "  px-4 py-2 md:px-6 md:py-3",
    small: baseStyle + " text-xs px-4 py-2 md:px-5 md:py-2.5",
    round: baseStyle + " w-8 h-8",
    absolute:
      baseStyle +
      " absolute right-0 h-10 top-0 bottom-0 px-4 font-medium tracking-widest",
    secondary:
      " px-4 py-2 md:px-6 md:py-3 disabled:cursor-not-allowed inline-block rounded-full  font-semibold border-2 border-stone-300 text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed ",
  };
  if (to) {
    return (
      <Link to={to} className={style[type]} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button className={style[type]} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
