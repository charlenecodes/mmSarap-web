import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbUserPentagon } from "react-icons/tb";
import { AuthContext } from "../context/AuthContext";
import { BiHomeHeart } from "react-icons/bi";
import { LuChefHat } from "react-icons/lu";
import { RiAddCircleFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { BiLogInCircle } from "react-icons/bi";
import useCuisines from "../hooks/useCuisines";

const NavBar = () => {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex flex-row flex-wrap  mt-3 mx-2 md:mx-5 text-2xl text-tropical font-semibold justify-between">
        <div>
          <ul className="flex flex-row items-center gap-x-1 sm:gap-x-3">
            <li
              className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
              onClick={() => navigate("/")}
            >
              <span className="sm:block hidden">Home</span>
              <BiHomeHeart className="text-3xl visible sm:hidden" />
            </li>

            <li
              className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
              onClick={() => {
                navigate("recipes");
              }}
            >
              <span className="sm:block hidden">Recipes</span>
              <LuChefHat className="text-3xl visible sm:hidden" />
            </li>

            {isLoggedIn && (
              <>
                <li
                  className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
                  onClick={() => navigate("addrecipe")}
                >
                  <span className="sm:block hidden">Add Recipe</span>
                  <RiAddCircleFill className="text-3xl visible sm:hidden" />
                </li>
                <li
                  className="opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy"
                  onClick={() => navigate(`profile/${currentUser.username}`)}
                >
                  <span className="sm:block hidden">Profile</span>

                  <TbUserPentagon className="text-3xl visible sm:hidden" />
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex flex-row space-x-1 items-center">
          {!isLoggedIn ? (
            <button onClick={() => navigate("/login")}>
              <BiLogInCircle className="visible sm:hidden sm:opacity-75 hover:opacity-100 hover:text-tropical" />
              <span className="sm:block hidden opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy">
                Log in
              </span>
            </button>
          ) : (
            <button onClick={() => navigate("/account")}>
              <IoMdSettings className="visible sm:hidden sm:opacity-75 hover:opacity-100 hover:text-tropical" />
              <span className="sm:block hidden opacity-90 hover:opacity-100 hover:overline hover:decoration-wavy">
                Account
              </span>
            </button>
          )}
        </div>
      </nav>
      <br />
    </>
  );
};

export default NavBar;
