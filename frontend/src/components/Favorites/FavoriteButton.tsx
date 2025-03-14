import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Country } from "../../types/country";
import { favoritesApi } from "../../api/services/favorites";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface FavoriteButtonProps{
    country: Country;
    onToggle?:  (isFavorite: boolean) => void;
}

const FavoriteButton = ({country, onToggle}: FavoriteButtonProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        if(!user || isInitialized) return;
        const checkFavoriteStatus = async () => {
            try {
                const status = await favoritesApi.isFavorite(country.name.common);
                setIsFavorite(status);
                setIsInitialized(true);
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        }
        checkFavoriteStatus();
    }, [user,country.name.common, isInitialized]);
    useEffect(() => {
            
    }, [isFavorite]);
    const handleToggleFavorite = async () => {
        if (!user) return;
        setLoading(true);
        
        try {
            if(isFavorite) {
                await favoritesApi.removeFavorite(country.name.common);
                setIsFavorite(false);
            }else {
                await favoritesApi.addFavorite(country);
                setIsFavorite(true);
            }
            if(onToggle) {
                onToggle(!isFavorite);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            
        }finally{
            setLoading(false);
        }
    }

    if(!user) return null;
    return (
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton
                onClick={handleToggleFavorite}
                disabled={loading}
                color={"secondary"}
                sx={{color: isFavorite ? "red" : "secondary.dark" }}
                aria-label="toggle favorite"
                >
                    {isFavorite ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
        </Tooltip>
    )
}

export default FavoriteButton;