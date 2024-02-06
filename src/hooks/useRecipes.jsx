import { useState, useEffect } from "react";
import axios from "axios";

const useRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  async function getAllRecipes() {
    try {
      await axios
        // ^ DB is on Port3000
        .get(`http://localhost:3000/recipes/`)
        .then((res) => setAllRecipes(res.data));
    } catch (err) {
      console.error({ error: `Error in useRecipes.jsx ${err.message}` });
    }
  }
  useEffect(() => {
    getAllRecipes();
  }, []);

  return {
    allRecipes,
    setAllRecipes,
  };
};

export default useRecipes;
