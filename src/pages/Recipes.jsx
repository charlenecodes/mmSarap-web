import RecipeCard from "../components/RecipeCard";
import FilterButton from "../components/FilterButton";
import useRecipes from "../hooks/useRecipes";

const Recipes = ({ cuisineSelected, setCuisineSelected, toggleFavorite }) => {
  const { allRecipes } = useRecipes();

  return (
    <>
      {/* header */}
      {cuisineSelected ? (
        <h1 className="flex items-center justify-center text-4xl font-semibold text-orange-400">
          {cuisineSelected[0].toUpperCase() + cuisineSelected.substring(1)}{" "}
          Recipes
        </h1>
      ) : (
        <h1 className="flex items-center justify-center text-4xl font-semibold text-orange-400">
          All Recipes
        </h1>
      )}
      <div className="mx-5 mt-3 md:mt-10">
        <FilterButton
          cuisineSelected={cuisineSelected}
          setCuisineSelected={setCuisineSelected}
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center">
        {!cuisineSelected &&
          allRecipes?.map((recipe) => {
            return (
              <div key={recipe._id}>
                <RecipeCard recipe={recipe} toggleFavorite={toggleFavorite} />
              </div>
            );
          })}

        {cuisineSelected &&
          allRecipes
            ?.filter((recipe) => recipe.cuisine === cuisineSelected)
            .map((recipe) => {
              return (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  toggleFavorite={toggleFavorite}
                />
              );
            })}
      </div>
    </>
  );
};

export default Recipes;
