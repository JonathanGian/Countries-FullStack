import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Country } from '../../types/country';
import { addFavoriteToDB, removeFavoriteFromDB, selectAllFavorites } from '../../store/slices/favoritesSlice';
import { useAuth } from '../../context/AuthContext';

interface FavoriteButtonProps {
  country: Country;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ country }) => {
  const dispatch = useAppDispatch();
  // Retrieve the list of favorites from the Redux store
  const favorites = useAppSelector(selectAllFavorites);
  const { user} = useAuth();
   // Check if the current country is in favorites by comparing a unique field (e.g., country code)
  const isFavorite = favorites.some(fav => fav.country_code === country.cca3);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteFromDB(country.cca3)); // removeFavorite expects the country code
    } else {
      dispatch(addFavoriteToDB(country)); // addFavorite expects the entire country object
    }
  };
if (!user) {
  return (
    <Tooltip title="Login to add to favorites">
      <IconButton >
        {<FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
}
  return (
    <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton disabled={!user} onClick={handleToggleFavorite} aria-label="toggle favorite">
        {isFavorite ? <Favorite color="primary" /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;