import useCuisines from "../hooks/useCuisines";
import { MdClose } from "react-icons/md";

const FilterButton = ({ cuisineSelected, setCuisineSelected }) => {
  const { allCuisines } = useCuisines();

  return (
    <div className="flex flex-row flex-wrap gap-1 justify-center">
      {cuisineSelected && (
        <button
          className="text-white bg-tropical font-medium border border-1 border-tropical rounded-full px-3"
          onClick={() => setCuisineSelected(null)}
        >
          <div className="flex flex-row justify-center items-center gap-2 pl-1">
            <p>
              {cuisineSelected[0].toUpperCase() + cuisineSelected.substring(1)}
            </p>
            <MdClose />
          </div>
        </button>
      )}
      {!cuisineSelected &&
        allCuisines.map((cuisine) => {
          return (
            <button
              onClick={() => setCuisineSelected(cuisine)}
              className={
                "text-tropical  font-medium border border-1 border-tropical rounded-full px-5"
              }
              key={cuisine}
            >
              {cuisine[0].toUpperCase() + cuisine.substring(1)}
            </button>
          );
        })}
    </div>
  );
};

export default FilterButton;
