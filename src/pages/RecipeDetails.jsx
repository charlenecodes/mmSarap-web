import React from "react";
import { useLocation } from "react-router";
import { RxDotFilled } from "react-icons/rx";

const RecipeDetails = () => {
  const { state } = useLocation();
  return (
    <div>
      <p className="flex items-center justify-center text-4xl font-semibold text-orange-400">
        {state.recipe.dishName[0].toUpperCase() +
          state.recipe.dishName.substring(1)}
      </p>
      <div className="flex justify-center space-x-1 text-2xl font-semibold xl:mt-3">
        <span className="text-gray-600">by</span>
        <span className=" text-tropical hover:overline hover:decoration-wavy">
          {state.recipe.addedBy}
        </span>
      </div>
      <br />
      <div className="lg:mx-40 mx-5">
        <p className="flex flex-wrap text-xl font-semibold text-orange-400">
          Ingredients
        </p>
        <div>
          {state.recipe.ingredients.map((ingredient, index) => {
            return (
              <div
                key={index}
                className="flex flex-row flex-wrap items-center mx-5 text-gray-700"
              >
                <RxDotFilled />
                <p>{ingredient[0].toUpperCase() + ingredient.substring(1)}</p>
              </div>
            );
          })}
        </div>
        <br />
        <p className="flex text-xl font-semibold text-orange-400">
          Instructions
        </p>
        <div>
          {state.recipe.instructions.map((instruction, index) => {
            return (
              <div
                key={index}
                className="flex flex-row space-x-1 mx-5  text-gray-700"
              >
                {/* <RxDotFilled /> */}
                <p>{index + 1}. </p>
                <p>{instruction[0].toUpperCase() + instruction.substring(1)}</p>
              </div>
            );
          })}
        </div>
      </div>
      <br />
    </div>
  );
};

export default RecipeDetails;
