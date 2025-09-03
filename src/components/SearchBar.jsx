import { useState } from "react";
import AlbumCard from "./AlbumCard";

const GENRES = ["", "pop", "rock", "hip hop", "latin", "electronic", "jazz", "r&b", "country"];

export default function SearchBar() {
    const [q, setQ] = useState("");
    const [genre, setGenre] = useState("");
    const [yearMin, setYearMin] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async (e) => {
        e?.preventDefault?.();
        if (!q.trim() && !genre) return;
        setLoading(true);
        try {
            const term = [q, genre].filter(Boolean).join(" ");
            const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song`;
            const res = await fetch(url);
            const json = await res.json();
            const rows = (json.results || []).map(r => ({
                id: String(r.trackId || r.collectionId),
                cover: r.artworkUrl100?.replace("100x100bb", "400x400bb") || r.artworkUrl100,
                title: r.trackName || r.collectionName,
                artist: r.artistName,
                year: new Date(r.releaseDate).getFullYear(),
                previewUrl: r.previewUrl || null,
            }));
            const filtered = yearMin ? rows.filter(r => r.year >= Number(yearMin)) : rows;
            setResults(filtered);
        } finally { setLoading(false); }
    };

    return (
        <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px 32px" }}>
            <form onSubmit={search} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 140px 120px", gap: 10, marginBottom: 12 }}>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Artista o álbum" style={input} />
                <select value={genre} onChange={(e) => setGenre(e.target.value)} style={input}>
                    {GENRES.map(g => <option key={g} value={g}>{g || "Todos los géneros"}</option>)}
                </select>
                <input value={yearMin} onChange={(e) => setYearMin(e.target.value)} type="number" placeholder="Año mínimo" style={input} />
                <button style={btn}>Buscar</button>
            </form>

            {loading && <p style={{ color: "#555" }}>Cargando…</p>}
            {!loading && results.length === 0 && <p style={{ color: "#777" }}>Sin resultados aún.</p>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {results.map(r => <AlbumCard key={r.id} {...r} />)}
            </div>
        </section>
    );
}
const input = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #ddd", outline: "none" };
const btn = { border: "none", background: "#111", color: "#fff", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontWeight: 700 };
