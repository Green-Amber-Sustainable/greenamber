import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from './components/Layout'
import Home from './pages/Home'
import Account from './pages/Account'
import Explore from './pages/Explore'
import Inventors from './pages/Inventors'
import Project from './pages/Project'
import Brainstorm from './pages/Brainstorm'
import Terms from './pages/statics/Terms'
import About from "./pages/statics/About"
import Privacy from "./pages/statics/Privacy"

function App() {

  return (
    <div className="bg-slate-950 w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} exact>
            <Route path="" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="inventors" element={<Inventors />} />
            <Route path="project" element={<Project />} />
            <Route path="account" element={<Account />} />
            <Route path="talk-to-doc" element={<Brainstorm />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
