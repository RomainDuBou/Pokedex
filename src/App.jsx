import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Composants/Header/Header";
import PokemonList from "./Composants/PokemonList/PokemonList";
import PokemonDetails from "./Composants/PokemonDetails/PokemonDetails";
import { LanguageProvider } from "./context/LanguageContext";
import { useState } from "react";


function App() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <BrowserRouter>
      <LanguageProvider>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <PokemonList
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
