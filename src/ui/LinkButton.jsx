import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const style =
    "text-blue-500 transition-all duration-300 hover:-translate-x-2 hover:underline";

  if (to === "-1") {
    return (
      <button className={style} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }
  return (
    <Link className={style} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
