export default function Hero() {
    return (
        <section style={{
            display: "grid", gap: 12, padding: "40px 16px",
            maxWidth: 1080, margin: "0 auto"
        }}>
            <h1 style={{ fontSize: 36, lineHeight: 1.1 }}>
                Toda tu música, en un solo lugar.
            </h1>
            <p style={{ color: "#555", maxWidth: 720 }}>
                Explora álbumes, artistas y playlists inspiradas en Spotify/Deezer/Apple Music.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href="/library" style={btnPrimary}>Explorar ahora</a>
                <a href="/contact" style={btnGhost}>Sugerir álbum</a>
            </div>
        </section>
    );
}

const btnPrimary = {
    padding: "12px 16px", borderRadius: 12, background: "#111", color: "#fff",
    textDecoration: "none", fontWeight: 700
};
const btnGhost = {
    padding: "12px 16px", borderRadius: 12, border: "1px solid #111",
    color: "#111", textDecoration: "none", fontWeight: 700
};
