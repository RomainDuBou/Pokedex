import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokedex-jgabriele.vercel.app/pokemons.json`
        );
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des détails du Pokémon"
          );
        }
        const data = await response.json();
        const selectedPokemon = data.find((p) => p.id === parseInt(id));
        setPokemon(selectedPokemon);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={5}>
        Erreur : {error}
      </Typography>
    );
  if (!pokemon)
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        Aucun Pokémon trouvé
      </Typography>
    );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
      <Paper
        elevation={6}
        sx={{ maxWidth: 600, width: "100%", p: 4, borderRadius: 4 }}
      >
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          mb={2}
          fontWeight="bold"
          textTransform="capitalize"
        >
          {pokemon.names.fr}
        </Typography>

        <Box display="flex" justifyContent="center" mb={4}>
          <Box
            component="img"
            src={pokemon.image}
            alt={pokemon.names.fr}
            sx={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>

        <Box mb={4}>
          <Box display="flex">
            <Box>
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Détails
              </Typography>
              <Typography variant="body1">
                <strong>Taille :</strong> {pokemon.height} ft
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Poids :</strong> {pokemon.weight} lbs
              </Typography>
            </Box>
            <Box>
              <Button type="select">Moves</Button>
            </Box>
          </Box>

          <Typography variant="h6" fontWeight="medium" mt={3} gutterBottom>
            Types
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {pokemon.types.map((type) => (
              <Chip
                key={type}
                label={type}
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: typeColor(type),
                  color: "#fff",
                }}
              />
            ))}
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.history.back()}
            sx={{ paddingX: 3, paddingY: 1 }}
          >
            Retour
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

const typeColor = (type) => {
  switch (type) {
    case "fire":
      return "#F08030";
    case "water":
      return "#6890F0";
    case "grass":
      return "#78C850";
    case "electric":
      return "#F8D030";
    case "poison":
      return "#A040A0";
    case "bug":
      return "#A8B820";
    case "flying":
      return "#A890F0";
    case "normal":
      return "#A8A878";
    case "fairy":
      return "#EE99AC";
    case "ground":
      return "#E0C068";
    case "fighting":
      return "#C03028";
    case "psychic":
      return "#F85888";
    case "rock":
      return "#B8A038";
    case "dragon":
      return "#7038F8";
    case "ice":
      return "#98D8D8";
    case "ghost":
      return "#705898";
    default:
      return "#68A090";
  }
};

export default PokemonDetails;
