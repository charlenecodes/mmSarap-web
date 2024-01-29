import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-4xl justify-center font-semibold text-orange-400 mb-4">
        Log In
      </p>
      <input
        className="text-xl p-1 border border-solid rounded-md m-2"
        placeholder="username"
      />
      <input
        className="text-xl p-1 border border-solid rounded-md"
        placeholder="password"
      />
      <button className="m-5 text-tropical text-2xl hover:text-white hover:bg-tropical font-normal border border-1 border-tropical rounded-full px-5">
        Log in
      </button>
    </div>
  );
};

export default Login;
