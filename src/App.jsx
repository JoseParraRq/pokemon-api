import { AppRouter } from './AppRouter'
import { PokemonProvider } from './context/PokemonProvider'
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//core
import "primereact/resources/primereact.min.css";    

import "primereact/resources/themes/lara-light-blue/theme.css";

function App() {
  return (
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  )
}

export default App
