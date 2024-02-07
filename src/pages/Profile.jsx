import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import useRecipes from "../hooks/useRecipes";
import { useNavigate } from "react-router-dom";
import useCuisines from "../hooks/useCuisines";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import RecipeCard from "../components/RecipeCard";

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
            <div className="flex md:flex-row justify-center flex-col">
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                toggleFavorite={toggleFavorite}
              />
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
