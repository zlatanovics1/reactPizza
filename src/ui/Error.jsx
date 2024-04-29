import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="mt-20 space-y-5 text-center">
      <h1>Something went wrong :/</h1>
      <p className="font-medium">{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
