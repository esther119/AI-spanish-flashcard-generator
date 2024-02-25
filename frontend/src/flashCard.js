import React, { useState } from "react";
import LoadingSpinner from "./loadingSpinner";

export default function FlashCard({ flashCard }) {
  const [flip, setFlip] = useState(false);
  const handleClick = () => {
    setFlip(!flip);
  };

  return (
    <div
      className="relative m-8 w-72 h-72 overflow-hidden transform 
                  transition duration-700 ease-in-out bg-white rounded-xl shadow-lg
                  cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`absolute w-full h-full flex items-center justify-center 
                      text-2xl font-semibold text-gray-700 
                      transition duration-700 ease-in-out
                      backface-hidden ${flip ? "rotate-y-0" : "rotate-y-180"}`}
      >
        {flashCard.back}
      </div>

      <div
        className={`absolute w-full h-full flex items-center justify-center 
                        text-xl font-semibold text-gray-700 
                        transition duration-700 ease-in-out
                        backface-hidden rotate-y-180 ${
                          flip ? "rotate-y-180" : "rotate-y-360"
                        }`}
      >
        {flashCard.isLoading ? (
          <LoadingSpinner />
        ) : (
          // Render flashcard front image
          <img
            src={flashCard.front}
            alt={`Flashcard front`}
            className="object-fit"
          />
        )}
      </div>
    </div>
  );
}
