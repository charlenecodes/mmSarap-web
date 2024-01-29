import { useEffect, useState } from "react";
import axios from "axios";

const useCuisines = () => {
  const [allCuisines, setAllCuisines] = useState([]);

  async function getAllCuisines() {
    try {
      await axios
        // ^ DB is on Port3000
        .get(`http://localhost:3000/recipes/cuisines`)
        .then((res) => setAllCuisines(res.data));
    } catch (err) {
      console.error({ error: `Error in useCuisines.jsx ${err.message}` });
    }
  }
  useEffect(() => {
    getAllCuisines();
  }, []);

  return {
    allCuisines,
    setAllCuisines,
  };
};

export default useCuisines;
