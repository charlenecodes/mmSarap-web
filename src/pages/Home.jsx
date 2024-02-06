import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import useCuisines from "../hooks/useCuisines";
import { useNavigate } from "react-router-dom";

const Home = ({ setCuisineSelected }) => {
  const navigate = useNavigate();
  const { allCuisines } = useCuisines();
  const favorites = 0;

  return (
    <>
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        Home
      </p>
      <div className="sm:mx-5 mx-3 my-5 md:my-0">
        <div className="space-x-1">
          <Link
            to="recipes"
            className="opacity-90 hover:opacity-100 group flex items-center text-2xl font-semibold text-tropical justify-center sm:justify-start"
          >
            Explore by Cuisine
            <span className="opacity-0 group-hover:opacity-100">
              <MdOutlineArrowForwardIos />
            </span>
          </Link>
        </div>
        <div className="mx-3 my-1 flex flex-wrap justify-center md:justify-start">
          {allCuisines?.map((cuisine, index) => {
            return (
              <button
                key={index}
                className="flex m-2 rounded-tr size-32 lg:size-40 justify-center items-center bg-tropical text-white font-medium"
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

        {favorites !== 0 && (
          <div className="space-x-1">
            <p>Favorites</p>
            <Link
              to="favorites/:username"
              className="opacity-90 hover:opacity-100 group flex items-center text-2xl font-semibold text-tropical"
            >
              <span className="opacity-0 group-hover:opacity-100">
                <MdOutlineArrowForwardIos />
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
