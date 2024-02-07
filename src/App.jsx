import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Account from "./pages/Account";
import RecipeDetails from "./pages/RecipeDetails";
import Register from "./pages/Register";
import { PrivateRoutes } from "./PrivateRoutes";
import PublicProfile from "./pages/PublicProfile";
import { FaHeart } from "react-icons/fa6";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const logout = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  // ^ CUISINE FILTER
  const [cuisineSelected, setCuisineSelected] = useState(null);

  async function toggleFavorite() {
    // we want to pass the userId and the recipeId because these are what we will use in order to populate the data on the DB and connect it to the
    try {
      <FaHeart className="text-red" />;
      // check if the recipe is already in the DB
      // ^ if in DB, delete from favorites, change the icon
      // ^ else add to favorites, change the icon
      // need the information of the currently logged in user as well to connect the information
      // send ${currentUser.username} to the backend and find the user that has a match - this means only logged in users can favorites
      // use the information from the recipes and user collections in order to create the favorites collection
    } catch (err) {
      console.error({
        error: `${err.message}, error adding ${recipe.dishName} to favorites, Recipes.jsx`,
      });
    }
  }
  toggleFavorite();
  // toggleFavorite is being passed to a few components

  return (
    <>
      {/* needs to be double brackets, prettify made it with parentheses inside the curly brackets */}
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          currentUser,
          setCurrentUser,
          logout,
        }}
      >
        <NavBar />
        <Routes>
          <Route
            path=""
            element={
              <Home
                cuisineSelected={cuisineSelected}
                setCuisineSelected={setCuisineSelected}
              />
            }
          />
          <Route
            path="recipes"
            element={
              <Recipes
                cuisineSelected={cuisineSelected}
                setCuisineSelected={setCuisineSelected}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recipes/:id" element={<RecipeDetails />} />
          <Route
            path="user/:username"
            element={<PublicProfile toggleFavorite={toggleFavorite} />}
          />

          {/* private routes only visible for logged in users */}
          <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
            <Route path="addrecipe" element={<AddRecipe />} />
            <Route
              path="profile/:username"
              element={<Profile toggleFavorite={toggleFavorite} />}
            />
            <Route
              path="favorites/:username"
              element={<Favorites toggleFavorite={toggleFavorite} />}
            />
            <Route path="account" element={<Account />} />
          </Route>

          {/* if the user types another route it will return the Login page */}
          <Route path="*" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </AuthContext.Provider>
    </>
  );
}

export default App;
