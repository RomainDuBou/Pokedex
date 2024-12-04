import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLanguage } from "../../context/LanguageContext";
import SearchIcon from '@mui/icons-material/Search';


const translations = {
  fr: "Rechercher un pokémon",
  en: "Search for a Pokémon",
  de: "Nach einem Pokémon suchen",
  it: "Cerca un Pokémon",
  es: "Buscar un Pokémon",
  ja: "ポケモンを探す",
  ko: "포켓몬 검색",
};

export default function SearchBar({ setSearchQuery }) {

  const { language } = useLanguage(); 

  const handleSearchChange = (event) => {
     setSearchQuery(event.target.value);
  }; 

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "38%" },
        textAlign: "center",
        marginTop: "20px",
        border: "none"
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          id="outlied-basic"
          label={translations[language]}
          type="search"
          variant="outlined"
          sx={{
            width: "500px",
            borderRadius: "50px", 
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", 
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none", 
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "transparent", 
            },
          }}
        
          onChange={handleSearchChange}
        />
      </div>
    </Box>
  );
}
