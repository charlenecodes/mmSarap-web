import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import useRecipes from "../hooks/useRecipes";
import { useNavigate } from "react-router-dom";
import useCuisines from "../hooks/useCuisines";
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const Profile = ({ toggleFavorite }) => {
  const { currentUser } = useContext(AuthContext);
  const { allRecipes, setAllRecipes } = useRecipes();
  const { setAllCuisines } = useCuisines();
  const navigate = useNavigate();
  const userRecipes = allRecipes?.filter(
    (recipe) => recipe.addedBy === currentUser.username,
  );

  async function deleteRecipe(id, dish) {
    try {
      await axios
        .delete(`http://localhost:3000/recipes/${id}/${currentUser.username}`)
        .then((res) => {
          // res.data.allRecipes returns ALL the recipes after the specific one was removed
          setAllRecipes(res.data.allRecipes);
          setAllCuisines(res.data.allCuisines);
        });
    } catch (err) {
      console.error({
        error: `${err.message}, error deleting ${dish}, from Recipes.jsx`,
      });
    }
  }
  return (
    <>
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        Profile
      </p>

      {userRecipes.length !== 0 ? (
        userRecipes.map((recipe) => {
          return (
            <div className="mx-10 my-3 flex flex-wrap justify-start">
              <button
                key={recipe._id}
                className="flex flex-col text-wrap m-2 rounded-tr size-40 justify-between bg-tropical"
                onClick={() =>
                  navigate(`/recipes/${recipe._id}`, {
                    state: { recipe },
                  })
                }
              >
                <p className=" text-white font-medium self-center">
                  {recipe.dishName[0].toUpperCase() +
                    recipe.dishName.substring(1)}
                </p>
                <FaTrashAlt
                  className="text-white self-start m-2 text-xl"
                  onClick={(e) => {
                    console.log("delete", recipe);
                    deleteRecipe(recipe._id, recipe.dishName);
                    e.stopPropagation();
                  }}
                />
              </button>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col justify-center items-center m-5">
          <BiSolidMessageSquareAdd
            className="text-4xl text-tropical"
            onClick={() => {
              navigate(`/addrecipe`);
            }}
          />
          <p className="text-zinc-700">Click to add a Recipe</p>
        </div>
      )}
    </>
  );
};

export default Profile;
