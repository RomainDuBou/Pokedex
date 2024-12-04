import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { AppBar, Box, Toolbar, Stack, Select, MenuItem } from "@mui/material";

export default function Header() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ height: "100px", backgroundColor: "#53a0ec" }}>
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: "100%" }}>
            <img src="/images/logo.svg" alt="Logo" style={{ height: "80px", padding: 5 }} />

            <Select value={language} onChange={handleLanguageChange} sx={{ color: "white" }}>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="de">Allemand</MenuItem>
              <MenuItem value="it">Italien</MenuItem>
              <MenuItem value="es">Espagnol</MenuItem>
              <MenuItem value="ja">Japonais</MenuItem>
              <MenuItem value="ko">Chinois</MenuItem>
            </Select>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}