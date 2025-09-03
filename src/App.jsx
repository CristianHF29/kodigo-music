import { Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./PlayerProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Contact from "./pages/Contact";
import PlayerBar from "./components/PlayerBar";
import './App.css'

export default function App() {
  return (
    <PlayerProvider>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<h2 style={{ padding: 24 }}>404</h2>} />
          </Routes>
        </main>
        <PlayerBar />
      </div>
    </PlayerProvider>
  );
}