import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaRegHeart } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

// create different styles for when the user is or isn't logged in - when the heart is there and isn't there
const RecipeCard = ({ icon, recipe, toggleFavorite }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div className="mx-2 my-3 md:flex justify-center">
        <div className="m-2">
          <div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            onClick={() =>
              navigate(`/recipes/${recipe._id}`, {
                state: { recipe },
              })
            }
          >
            <div>
              <img
                className="h-40 md:h-60 w-full object-cover"
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>

            <div className="flex flex-col text-wrap mb-5 mt-3 mx-3">
              <div className="flex flex-row justify-between items-center">
                <p className="text-tropical text-2xl font-semibold">
                  {recipe.dishName[0].toUpperCase() +
                    recipe.dishName.substring(1)}
                </p>
                <div className="flex flex-row items-center">
                  {currentUser.username &&
                    location.pathname !==
                      `/profile/${currentUser.username}` && (
                      <FaRegHeart
                        className="text-tropical text-2xl"
                        onClick={(e) => {
                          toggleFavorite();
                          console.log("favorite", recipe);
                          e.stopPropagation();
                        }}
                      />
                    )}

                  {currentUser.username &&
                    location.pathname ===
                      `/profile/${currentUser.username}` && (
                      <FaTrashAlt
                        className="text-tropical self-start m-2 text-xl"
                        onClick={(e) => {
                          console.log("delete", recipe);
                          deleteRecipe(recipe._id, recipe.dishName);
                          e.stopPropagation();
                        }}
                      />
                    )}
                </div>
              </div>
              <p
                onClick={(e) => {
                  navigate(`/user/${recipe.addedBy}`, {
                    state: {
                      user: recipe.addedBy,
                    },
                  });
                  e.stopPropagation();
                }}
              >
                by <span className="text-tropical">{recipe.addedBy}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
