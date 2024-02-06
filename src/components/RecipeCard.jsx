import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaRegHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// create different styles for when the user is or isn't logged in - when the heart is there and isn't there
const RecipeCard = ({ recipe, toggleFavorite }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="mx-10 my-3 md:flex justify-center">
        <div key={recipe._id} className="m-2">
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
                className="h-48 w-full object-cover"
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800"
              />
            </div>

            <div className="flex flex-col text-wrap mb-5 mt-3 mx-3">
              <div className="flex flex-row justify-between items-center">
                <p className="text-tropical text-2xl font-semibold">
                  {recipe.dishName[0].toUpperCase() +
                    recipe.dishName.substring(1)}
                </p>
                {currentUser.username && (
                  <FaRegHeart
                    className="text-tropical text-2xl"
                    onClick={(e) => {
                      toggleFavorite();
                      console.log("favorite", recipe);
                      e.stopPropagation();
                    }}
                  />
                )}
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
