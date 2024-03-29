import { useContext, useState } from "react";
import useRecipes from "../hooks/useRecipes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import useCuisines from "../hooks/useCuisines";
import RecipeCard from "../components/RecipeCard";
import Button from "../components/Button";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { setAllCuisines } = useCuisines();

  const [recipe, setRecipe] = useState({
    dishName: "",
    cuisine: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const { setAllRecipes } = useRecipes();

  const onSubmit = () => {
    async function addRecipe() {
      let data = JSON.stringify(recipe);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://mmsarap.onrender.com/recipes/${currentUser.username}/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setAllRecipes(response.data.allRecipes);
          setAllCuisines(response.data.allCuisines);
        })
        .then(
          setRecipe({
            dishName: "",
            cuisine: "",
            ingredients: "",
            instructions: "",
          }),
        )
        .then(() => {
          setTimeout(() => {
            navigate(`/profile/${currentUser.username}`);
          }, 1200);
        })

        .catch((error) => {
          console.error({ error: `${error.message}, error adding recipe` });
        });
    }
    addRecipe();
  };

  return (
    <>
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        Add Recipe
      </p>

      <div className="flex flex-col justify-center m-2 mx-20 md:mx-60">
        <label className="text-tropical opacity-85 font-semibold text-center">
          Dish name
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name={"dishName"}
          value={recipe.dishName}
          placeholder="dish name"
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md mb-1"
        />
        <label className="text-tropical opacity-85 font-semibold text-center">
          Cuisine
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name={"cuisine"}
          type="cuisine"
          value={recipe.cuisine}
          placeholder="cuisine"
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md mb-1"
        />
        <label className="text-tropical opacity-85 font-semibold text-center">
          Ingredients
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name={"ingredients"}
          type="ingredients"
          value={recipe.ingredients}
          placeholder="ingredients"
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md mb-1"
        />
        <label className="text-tropical opacity-85 font-semibold text-center">
          Instructions
        </label>
        <input
          onChange={(e) => handleChange(e)}
          name={"instructions"}
          type="instructions"
          value={recipe.instructions}
          placeholder="instructions"
          className="text-xl text-gray-600 px-2 py-1 border border-solid rounded-md mb-1"
        />
      </div>
      <Button text={"Submit"} onClick={onSubmit} />
    </>
  );
};

export default AddRecipe;
