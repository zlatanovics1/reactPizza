import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { createUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createUser(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p className="text-sm md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        className="input"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <Button type="primary" to="/menu">
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
