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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  // ^ CUISINE FILTER
  const [cuisineSelected, setCuisineSelected] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  return (
    <>
      <AuthContext.Provider value={(currentUser, isLoggedIn, setIsLoggedIn)}>
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
              />
            }
          />
          <Route path="addrecipe" element={<AddRecipe />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="favorites/:username" element={<Favorites />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account />} />
          <Route path="recipe/:id" element={<RecipeDetails />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
