import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [registration, setRegistration] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(registration);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        // object of the user info is in response.data
        console.log(response.data);
        navigate(`/login`);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setError(error.response.data.error);
      });
  };
  return (
    <div>
      <div>
        <p className="flex justify-center text-4xl font-semibold text-orange-400 mb-4">
          Register
        </p>
      </div>
      <p className="text-red-900 text-center">{error !== null && error}</p>
      <div className="flex flex-col justify-center">
        <input
          onChange={(e) => handleChange(e)}
          name={"name"}
          value={registration.name}
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md"
          placeholder="name"
        />
        <input
          onChange={(e) => handleChange(e)}
          name={"email"}
          type="email"
          value={registration.email}
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md my-2"
          placeholder="email"
        />
        <input
          onChange={(e) => handleChange(e)}
          name={"username"}
          value={registration.username}
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md"
          placeholder="username"
        />
        <input
          onChange={(e) => handleChange(e)}
          name={"password"}
          type="password"
          value={registration.password}
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md my-2"
          placeholder="password"
        />
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={onSubmit}
          className="my-3  text-tropical text-2xl hover:text-white hover:bg-tropical font-normal border border-1 border-tropical rounded-full px-5"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
