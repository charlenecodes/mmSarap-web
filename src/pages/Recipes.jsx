import { useState } from "react";
import useRecipes from "../hooks/useRecipes";
import FilterButton from "../components/FilterButton";
import { useNavigate } from "react-router-dom";

const Recipes = ({ cuisineSelected, setCuisineSelected }) => {
  const { allRecipes } = useRecipes();
  const navigate = useNavigate();

  return (
    <>
      {cuisineSelected ? (
        <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
          {cuisineSelected} Recipes
        </p>
      ) : (
        <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
          All Recipes
        </p>
      )}
      <div className="mx-10 mt-10 flex flex-wrap">
        <FilterButton
          cuisineSelected={cuisineSelected}
          setCuisineSelected={setCuisineSelected}
        />
      </div>

      {cuisineSelected && (
        <div className="mx-10 my-3 flex flex-wrap justify-start">
          {allRecipes
            ?.filter((recipe) => recipe.cuisine === cuisineSelected)
            .map((recipe, index) => {
              return (
                <button
                  key={index}
                  className="flex m-2 rounded-tr size-40 justify-center items-center bg-tropical text-white font-medium"
                  onClick={() =>
                    navigate("recipe/:id", {
                      recipe: recipe,
                    })
                  }
                >
                  {recipe.dishName[0].toUpperCase() +
                    recipe.dishName.substring(1)}
                </button>
              );
            })}
        </div>
      )}

      {!cuisineSelected && (
        <div className="mx-10 my-3 flex flex-wrap justify-start">
          {allRecipes?.map((recipe, index) => {
            return (
              <button
                key={index}
                className="flex m-2 rounded-tr size-40 justify-center items-center bg-tropical text-white font-medium"
                onClick={() => console.log(recipe)}
              >
                {recipe.dishName[0].toUpperCase() +
                  recipe.dishName.substring(1)}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Recipes;
