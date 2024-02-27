import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(loginDetails);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://mmsarap.onrender.com/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        // object of the user info is in response.data
        setCurrentUser(response.data.currentUser);
        navigate(`/`);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
      });
  };

  return (
    <div>
      <div className="flex flex-col text-center">
        <h1 className="text-4xl font-semibold text-orange-400 mb-4">Log In</h1>
      </div>
      <p className="text-red-900 text-center">{error !== null && error}</p>

      <div className="flex flex-col justify-center mx-10 lg:mx-72 xl:mx-96">
        <input
          onChange={(e) => handleChange(e)}
          name={"username"}
          value={loginDetails.username}
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md"
          placeholder="username"
        />
        <input
          onChange={(e) => handleChange(e)}
          name={"password"}
          type="password"
          value={loginDetails.password}
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md my-2"
          placeholder="password"
        />
        <button
          className="flex flex-row space-x-1 justify-end mx-1"
          onClick={() => navigate("/register")}
        >
          <p>No account?</p>
          <p className="text-tropical font-semibold">Register</p>
        </button>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={onSubmit}
          className="my-3  text-tropical text-2xl hover:text-white hover:bg-tropical font-normal border border-1 border-tropical rounded-full px-5"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
