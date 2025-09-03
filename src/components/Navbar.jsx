import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    color: isActive ? "#fff" : "#111",
    background: isActive ? "#111" : "transparent",
});

export default function Navbar() {
    return (
        <header style={{
            position: "sticky", top: 0, zIndex: 20,
            backdropFilter: "blur(6px)",
            borderBottom: "1px solid #eee"
        }}>
            <nav style={{
                maxWidth: 1080, margin: "0 auto",
                display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "14px 16px"
            }}>
                <div style={{ fontWeight: 650 }}>🎵 Kodigo Music</div>
                <div style={{ display: "flex", gap: 2 }}>
                    <NavLink to="/" style={linkStyle}>Inicio</NavLink>
                    <NavLink to="/library" style={linkStyle}>Biblioteca</NavLink>
                    <NavLink to="/contact" style={linkStyle}>Contacto</NavLink>
                </div>
            </nav>
        </header>
    );
}
