import { useSelector } from "react-redux";

function User() {
  const name = useSelector((state) => state.user.name);

  if (!name) return null;
  return (
    <div className="hidden md:block">
      <p>{name}</p>
    </div>
  );
}

export default User;
