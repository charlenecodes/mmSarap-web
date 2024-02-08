import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <div className="flex flex-wrap space-x-1 space-y-1 justify-center">
      <button
        className="px-5 text-xl border rounded-full border-tropical text-tropical hover:text-white hover:border-none hover:bg-tropical"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
