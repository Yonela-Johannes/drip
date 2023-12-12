import React, { useState } from "react";
import StarRatings from 'react-star-ratings';

const Rating = ({ rating, setRating, view, select, hover = false}) => {

  return (
    <div className="font-bold w-max text-center flex items-center justify-start gap-4">
      <StarRatings
        rating={rating == undefined ? 0 : Number(rating)}
        starRatedColor="pink"
        starHoverColor={hover ? 'pink' : 'rgb(203, 211, 227)'}
        changeRating={setRating == undefined ? 0 : setRating}
        numberOfStars={5}
        name='rating'
        starDimension="20px"
        starSpacing="10px"
        isSelectable={select}
      />
      {view && rating}
    </div>
  );
};

export default Rating;
