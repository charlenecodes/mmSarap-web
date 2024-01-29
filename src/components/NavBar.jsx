import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbUserPentagon } from "react-icons/tb";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex mt-3 mx-5 text-2xl text-tropical font-semibold justify-between">
        <div>
          <ul className="flex flex-wrap flex-row gap-x-3">
            <li
              className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
              onClick={() => navigate("recipes")}
            >
              Recipes
            </li>

            {isLoggedIn && (
              <>
                <li
                  className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
                  onClick={() => navigate("addrecipe")}
                >
                  Add Recipe
                </li>
                <li
                  className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
                  onClick={() => navigate("profile/:username")}
                >
                  Profile
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <TbUserPentagon
            className="text-3xl opacity-75 hover:opacity-100"
            onClick={
              !isLoggedIn
                ? () => navigate("/login")
                : () => navigate("/account")
            }
          />
        </div>
      </nav>
      <br />
    </>
  );
};

export default NavBar;
