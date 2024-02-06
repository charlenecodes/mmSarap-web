import React from "react";
import useRecipes from "../hooks/useRecipes";
import { useLocation } from "react-router-dom";

const PublicProfile = () => {
  const { allRecipes } = useRecipes();
  const { state } = useLocation();

  return <div>{state.user}</div>;
};

export default PublicProfile;
