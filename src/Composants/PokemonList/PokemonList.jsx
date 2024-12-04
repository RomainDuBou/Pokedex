import React, { useState, useEffect } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { Pagination } from "@mui/material";
import { Box, Grid2 } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import Categorie from "../Categories/Categorie";
import { useLanguage } from "../../context/LanguageContext";

function PokemonList({ searchQuery, setSearchQuery }) {
  const [pokemons, setPokemons] = useState([]);
  const [typeStyles, setTypeStyles] = useState({});
  const [selectedType, setSelectedType] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 8;
  const { language } = useLanguage();


  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokedex-jgabriele.vercel.app/pokemons.json"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des Pokémon");
        }
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTypeStyles = async () => {
      try {
        const response = await fetch(
          "https://pokedex-jgabriele.vercel.app/types.json"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des styles de types");
        }
        const data = await response.json();
        setTypeStyles(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemons();
    fetchTypeStyles();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

 
  const filteredPokemons = pokemons
  .filter((pokemon) =>
    pokemon.names[language]?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((pokemon) =>
    selectedType ? pokemon.types.includes(selectedType) : true // Corrigé ici
  );


return (
  <Box>
    <SearchBar setSearchQuery={setSearchQuery} />
    <Categorie selectedType={selectedType} setSelectedType={setSelectedType} />


    <Grid2
      container
      rowSpacing={3}
      columnSpacing={{ xs: 1, sm: 2, md: 7 }}
      direction="row"
      justifyContent={"space-evenly"}
      sx={{ flexWrap: "wrap", padding: 5 }}
    >
      {filteredPokemons
        .slice(
          (currentPage - 1) * pokemonsPerPage,
          currentPage * pokemonsPerPage
        )
        .map((pokemon) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} typeStyles={typeStyles} />
          </Grid2>
        ))}
    </Grid2>
    <Box
      sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Pagination
        count={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          padding: 5,
          "& .Mui-selected": {
            backgroundColor: "red",
            color: "white",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#333",
            color: "white",
          },
        }}
      />
    </Box>
  </Box>
);
}

export default PokemonList;