import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Account = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        Account
      </p>
      {currentUser.name && (
        <p className="text-orange-400 md:mx-50 mx-10 my-5">
          Welcome, {currentUser.name}!
        </p>
      )}
      <div className="md:mx-50 mx-10 my-5">
        <p>name: {currentUser.name}</p>
        <p>username: {currentUser.username}</p>
        <p>email: {currentUser.email}</p>
      </div>
      <div className="text-lg mb-5">
        <button
          className="px-5 md:text-2xl border rounded-full border-tropical text-tropical"
          onClick={() => {
            console.log("Edit");
          }}
        >
          Edit Account Info
        </button>
        <button
          className="px-5 md:text-2xl border rounded-full bg-tropical text-white"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
