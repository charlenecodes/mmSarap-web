import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import useCuisines from "../hooks/useCuisines";
import { useNavigate } from "react-router-dom";

const Home = ({ cuisineSelected, setCuisineSelected }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { allCuisines } = useCuisines();

  return (
    <>
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        Home
      </p>
      <div className="mx-10 my-10">
        {currentUser && <p>Hello, {currentUser.username}</p>}
        <div>
          <Link
            to="recipes"
            className="opacity-90 hover:opacity-100 group flex items-center text-2xl font-semibold text-tropical"
          >
            Explore by Cuisine
            <span> </span>
            <span className="opacity-0 group-hover:opacity-100">
              <MdOutlineArrowForwardIos />
            </span>
          </Link>
        </div>
        <div className="mx-3 my-3 flex flex-wrap justify-start">
          {allCuisines?.map((cuisine, index) => {
            return (
              <button
                key={index}
                className="flex m-2 rounded-tr size-40 justify-center items-center bg-tropical text-white font-medium"
                onClick={() => {
                  setCuisineSelected(cuisine);
                  navigate("recipes");
                }}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
        <br />
        <div>
          <Link
            to="favorites/:username"
            className="opacity-90 hover:opacity-100 group flex items-center text-2xl font-semibold text-tropical"
          >
            Favorites
            <span> </span>
            <span className="opacity-0 group-hover:opacity-100">
              <MdOutlineArrowForwardIos />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
