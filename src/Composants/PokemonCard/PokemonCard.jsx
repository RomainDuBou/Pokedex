import React from "react";
import { Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';

function PokemonCard({ pokemon, typeStyles }) {
  const { language } = useLanguage();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const convertHeight = (heightInFeet) => {
    const heightInMeters = heightInFeet * 0.3048;
    return heightInMeters < 1
      ? (heightInMeters * 100).toFixed(1) + " cm" 
      : heightInMeters.toFixed(2) + " m"; 
  };

  const convertWeight = (weightInLbs) => {
    const weightInKg = weightInLbs * 0.453592;
    return weightInKg.toFixed(2) + " kg";
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 200,
        padding: 4,
        textAlign: "center",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.15)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        },
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <h3>{pokemon.names[language]}</h3>
      <img
        src={pokemon.image}
        alt={pokemon.names[language]}
        style={{ width: "100px", height: "100px" }}
      />
      <p>
        {" "}
        <HeightIcon></HeightIcon>{convertHeight(pokemon.height)}<br />
        <ScaleIcon></ScaleIcon>{convertWeight(pokemon.weight)}
      </p>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
        {pokemon.types.map((type) => (
          <Box
            key={type}
            sx={{
              backgroundColor: typeStyles[type]?.backgroundColor || "#333",
              color: typeStyles[type]?.color || "white",
              borderRadius: "50px",
              padding: "9px",
              textAlign: "center",
              fontSize: "0.8em",
              minWidth: "50px",
            }}
          >
            {typeStyles[type]?.translations[language] || type}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default PokemonCard;
