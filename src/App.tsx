import { Routes, Route } from "react-router"
import Home from "./pages/Home/Home"
import Explore from "./pages/Explore/Explore"
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails"
import NotFound from "./pages/NotFound/NotFound"

import Layout from "./components/Layout/Layout"

function App () {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/anime/:id" element={<AnimeDetails/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  )
}

export default App;