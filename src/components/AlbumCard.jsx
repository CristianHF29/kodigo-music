import { usePlayer } from "../PlayerProvider";

export default function AlbumCard({ id, cover, title, artist, year, previewUrl }) {
    const { play, isFavorite, toggleFavorite } = usePlayer();
    const fav = isFavorite(id);

    return (
        <article style={{
            border: "1px solid #eee", borderRadius: 16, overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,.06)", background: "#fff"
        }}>
            <div style={{ position: "relative" }}>
                <img src={cover} alt={title} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 8, right: 8, display: "flex", gap: 8 }}>
                    <button
                        title={previewUrl ? "Reproducir preview" : "Sin preview"}
                        onClick={() => previewUrl && play({ title, artist, cover, previewUrl })}
                        disabled={!previewUrl}
                        style={{
                            padding: "6px 10px", borderRadius: 10, border: "none",
                            background: previewUrl ? "#111" : "#aaa", color: "#fff", cursor: previewUrl ? "pointer" : "not-allowed"
                        }}
                    >▶️</button>
                    <button
                        title="Favorito"
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(id); }}
                        style={{
                            padding: "6px 10px", borderRadius: 10, border: "1px solid #eee",
                            background: fav ? "#fde68a" : "#fff", cursor: "pointer"
                        }}
                    >{fav ? "★" : "☆"}</button>
                </div>
            </div>
            <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700 }}>{title}</div>
                <div style={{ color: "#555" }}>{artist} • {year}</div>
            </div>
        </article>
    );
}

