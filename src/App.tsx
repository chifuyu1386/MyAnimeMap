import { Routes, Route } from "react-router"
import Home from "./pages/Home/Home"
import Explore from "./pages/Explore/Explore"
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails"
import Favorites from "./pages/Favorites/Favorites"
import NotFound from "./pages/NotFound/NotFound"

function App () {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/anime/:id" element={<AnimeDetails/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
  )
}

export default App;