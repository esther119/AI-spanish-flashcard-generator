import React from "react";
import FlashCard from "./flashCard";

export default function FlashCardList({ imageData }) {
    // Split the flashCards into groups of 4
    console.log("imageData", imageData);
    const pairs = Object.entries(imageData);

    // Create an array of sets containing 4 pairs each
    const setsOfFourPairs = [];
    for (let i = 0; i < pairs.length; i += 4) {
      setsOfFourPairs.push(pairs.slice(i, i + 4));
    }
    // console.log("setsOfFourPairs", setsOfFourPairs);
  
    return (
      <div>
        {setsOfFourPairs.map((pairs, index) => (
          <div className="flex flex-row card-grid" key={index}>
            {pairs.map((flashCard) => 
              (<FlashCard flashCard={flashCard} key={index} />)
            )}
          </div>
        ))}
        <p> Hello</p>
      </div>
    );
  }
  