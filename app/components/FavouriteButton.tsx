'use client';

import { Heart, HeartIcon } from 'lucide-react';
import apiServive from '../services/apiServices';

interface FavouriteProps {
  id: string;
  is_favourite: boolean;
  markFavourite: (is_favourite: boolean) => void;
}

const FavouriteButton = ({
  id,
  is_favourite,
  markFavourite,
}: FavouriteProps) => {
  const toggleFavourite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const response = await apiServive.post(
      `properties/${id}/toggle_favourite/`,
      {},
    );
    markFavourite(response.is_favourite);
  };

  return (
    <div onClick={toggleFavourite}>

        
      <Heart
        className={`absolute  top-2 right-2  ${
          is_favourite ? 'text-airbnb' : 'text-white'
        }  hover:text-airbnb`}
      />
    </div>
  );
};
export default FavouriteButton;
