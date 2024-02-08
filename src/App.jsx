import { useState, useEffect } from "react";
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

  const [favorites, setFavorites] = useState([]);
  // ^ userFavorites needs to be sent/fetched from the DB
  const [userFavorites, setUserFavorites] = useState({
    id: "",
    favorites: favorites,
  });

  const addToFavorites = (recipe, userId) => {
    setFavorites([recipe, ...favorites]);
    setUserFavorites({
      id: userId,
      favorites: favorites,
    });
  };

  const removeFromFavorites = (recipe, userId) => {
    setFavorites(favorites.filter((favorite) => favorite !== recipe));
    setUserFavorites({
      id: userId,
      favorites: favorites.filter((favorite) => favorite !== recipe),
    });
  };

  async function toggleFavorite(recipe, userId) {
    try {
      if (!favorites.some((favorite) => favorite === recipe)) {
        addToFavorites(recipe, userId);
      } else {
        removeFromFavorites(recipe, userId);
      }
    } catch (err) {
      console.error({
        error: `${err.message}, error adding to favorites, App.jsx`,
      });
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          currentUser,
          setCurrentUser,
          logout,
          favorites,
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
