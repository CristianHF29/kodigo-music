import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import AlbumCard from "../components/AlbumCard";

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // Using iTunes API to load music
                const url = `https://itunes.apple.com/search?term=rock&entity=song`;
                const res = await fetch(url);
                const json = await res.json();
                const items = (json.results || []).map((r) => ({
                    id: String(r.trackId || r.collectionId || r.artistId || Math.random()),
                    cover: r.artworkUrl100?.replace("100x100bb", "400x400bb") || r.artworkUrl100,
                    title: r.trackName || r.collectionName,
                    artist: r.artistName,
                    year: new Date(r.releaseDate).getFullYear(),
                    previewUrl: r.previewUrl || null,
                }));
                setTrending(items);
            } finally { setLoading(false); }
        })();
    }, []);

    return (
        <>
            <Hero />
            <SearchBar />
            <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px 40px" }}>
                <h2 style={{ margin: "16px 0", textAlign: "center" }}>Tendencias</h2>
                {loading && <p style={{ textAlign: "center", color: "#555" }}>Cargando…</p>}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16
                }}>
                    {trending.map((a) => <AlbumCard key={a.id} {...a} />)}
                </div>
            </section>
        </>
    );
}

