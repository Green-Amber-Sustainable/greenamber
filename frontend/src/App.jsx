import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom"

import Layout from './components/Layout'
import Home from './pages/Home'
import Account from './pages/Account'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Bookmarks from './pages/Bookmarks'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
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
            <Route path="notifications" element={<Notifications />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path=":username" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
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
