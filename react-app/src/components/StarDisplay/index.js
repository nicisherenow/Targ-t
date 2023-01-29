import React, { useEffect, useState } from 'react';
import noStar from '../../assets/star.png'
import starRed from '../../assets/star-red.png'
import './StarDisplay.css'


export default function StarDisplay({ rate }) {
  const [rating, setRating] = useState(rate ? rate : 1);

  useEffect(() => {
    setRating(rate)
  }, [rate])

  return (
    <div className="star-display-rating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <img
            src={ratingValue <= rating ? starRed : noStar}
            key={i}
            alt={`star ${ratingValue}`}
            className='star-display-size'
          />
        );
      })}
    </div>
  );
};
