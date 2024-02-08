import React from "react";
import useRecipes from "../hooks/useRecipes";
import { useLocation } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const PublicProfile = ({ toggleFavorite }) => {
  const { allRecipes } = useRecipes();
  const { state } = useLocation();

  return (
    <div>
      <div className="flex flex-col text-center">
        <h1 className="text-4xl font-semibold text-orange-400 mb-4">
          Recipes by @{state?.user}
        </h1>
      </div>
      <div className="flex md:flex-row justify-center flex-col">
        {allRecipes
          ?.filter((recipe) => recipe.addedBy === state.user)
          .map((recipe) => {
            return (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                toggleFavorite={toggleFavorite}
                icon={"heart"}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PublicProfile;
