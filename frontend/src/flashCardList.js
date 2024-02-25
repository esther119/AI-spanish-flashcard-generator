import React from "react";
import FlashCard from "./flashCard";

export default function FlashCardList({ imageData }) {
  // console.log("imageData", imageData);
  const flashCards = Object.entries(imageData).map(([key, value], index) => {
    // Log the current entry
    console.log(`Processing entry - Key: ${key}, Value:`, value);
    // Return the mapped object
    return {
      id: index + 1,
      front: value.imageLink,
      back: value.word,
      isLoading: value.isLoading,
    };
  });

  const groupedFlashCards = [];
  for (let i = 0; i < flashCards.length; i += 4) {
    groupedFlashCards.push(flashCards.slice(i, i + 4));
  }
  const maxIndex = flashCards.length;
  console.log("maxIndex", maxIndex);

  return (
    <div>
      {groupedFlashCards.map((group, index) => (
        <div className="flex flex-row card-grid" key={index}>
          {group.map((flashCard) => (
            <FlashCard
              flashCard={flashCard}
              isLoading={flashCard.isLoading}
              key={flashCard.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
