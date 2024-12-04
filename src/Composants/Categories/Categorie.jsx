import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext"; 

function Categorie({ selectedType, setSelectedType }) {
  const [types, setTypes] = useState([]);
  const { language } = useLanguage(); 

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokedex-jgabriele.vercel.app/types.json");
        if (!response.ok) throw new Error("Erreur lors de la récupération des types");
        const data = await response.json();
        const translatedTypes = Object.keys(data).map((key) => ({
          code: key,
          label: data[key].translations[language] || key, 
        }));
        setTypes(translatedTypes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTypes();
  }, [language]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 1, mb: 3, margin: 5, }}>
      <Button onClick={() => setSelectedType("")}>
        Tous
      </Button>
      {types.map((type) => (
        <Button
          key={type.code}
          variant={selectedType === type.code ? "contained" : "outlined"}
          onClick={() => setSelectedType(type.code)}
          sx={{
            borderRadius: "50%",
            textTransform: "capitalize",
            padding: 1.1
          }}
        >
          {type.label} 
        </Button>
      ))}
    </Box>
  );
}

export default Categorie;
