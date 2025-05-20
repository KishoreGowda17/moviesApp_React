import { createContext, useContext, useEffect, useState } from "react";

// ✅ Create context
const MovieContext = createContext();

// ✅ Custom hook to access context
export const useMovieContext = () => useContext(MovieContext);

// ✅ Provider component
export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // Save to localStorage on favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  // Remove movie from favorites by id
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // Provide the context value
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
