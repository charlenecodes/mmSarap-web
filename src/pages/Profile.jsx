import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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
        .delete(`https://mmsarap.onrender.com/recipes/${id}/${currentUser.username}`)
        .then((res) => {
          // res.data.allRecipes returns ALL the recipes after the specific one was removed
          setAllRecipes(res.data.allRecipes);
          setAllCuisines(res.data.allCuisines);
        });
    } catch (err) {
      console.error({
        error: `${err.message}, error deleting ${dish}, from Profile.jsx`,
      });
    }
  }

  return (
    <>
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        Profile
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center">
        {userRecipes.length !== 0 ? (
          userRecipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                deleteRecipe={deleteRecipe}
                toggleFavorite={toggleFavorite}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center m-3 space-y-1 justify-center">
            <BiSolidMessageSquareAdd
              className="text-4xl text-tropical"
              onClick={() => {
                navigate(`/addrecipe`);
              }}
            />
            <p className="text-zinc-700">Click to add a Recipe</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
