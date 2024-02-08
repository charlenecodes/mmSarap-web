import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

const Account = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center">
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        Account
      </p>
      <div className="self-start my-5 mx-auto">
        <div>
          {currentUser.name && (
            <p className="text-orange-400 font-medium text-xl">
              Welcome, {currentUser.name}!
            </p>
          )}
        </div>
        <div className="">
          <p>name: {currentUser.name}</p>
          <p>username: {currentUser.username}</p>
          <p>email: {currentUser.email}</p>
        </div>
      </div>
      <Button
        text={"Edit Account Info"}
        onClick={() => {
          console.log("Edit");
        }}
      />
    </div>
  );
};

export default Account;
