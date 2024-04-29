import { useSelector } from "react-redux";
import { getUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function UserAuthProvider({ children }) {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  if (!user) navigate("/");
  return { children };
}

export default UserAuthProvider;
