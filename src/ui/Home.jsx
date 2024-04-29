import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const name = useSelector((state) => state.user.name);
  return (
    <div className="mb-10 text-center">
      <h1 className=" my-16 text-xl font-semibold  md:my-32 md:text-4xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {name === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {name}
        </Button>
      )}
    </div>
  );
}

export default Home;
