import React, { useState } from 'react';
import noStar from '../../assets/star.png'
import starRed from '../../assets/star-red.png'
import './StarComponent.css'


export default function StarComponent({ onChange, rate }) {
  const [rating, setRating] = useState(rate ? rate : 1);

  const updateRating = newRating => {
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <img
            src={ratingValue <= rating ? starRed : noStar}
            key={i}
            alt={`star ${ratingValue}`}
            className='star-size'
            onClick={() => updateRating(ratingValue)}
          />
        );
      })}
    </div>
  );
};
