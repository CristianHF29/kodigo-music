import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AlbumCard from "../components/AlbumCard";
import { usePlayer } from "../PlayerProvider";

const seed = [
    { id: "seed-1", cover: "https://i.ytimg.com/vi/NTa6Xbzfq1U/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-BIAC4AOKAgwIABABGDYgUSh_MA8=&rs=AOn4CLAH_yP9JtFv1JMErBLgfajKEsG5Kg", title: "Super MARIO BROS", artist: "Koji Kondo", year: 1986, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Super%20Mario%20Bros.%20Theme%20Song%20-%20ultragamemusic.mp3" },
    { id: "seed-2", cover: "https://i1.sndcdn.com/artworks-000601263640-q7qo1x-t500x500.jpg", title: "Gurenge", artist: "LiSA", year: 2019, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Demon%20Slayer%20-%20Opening%201%20%204K%20%2060FPS%20%20Creditless%20%20-%20Anicrad.mp3" },
    { id: "seed-3", cover: "https://i.ytimg.com/vi/qPdPjWkJZF8/sddefault.jpg", title: "Dandadan", artist: "Okotone", year: 2024, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/DAN%20DA%20DAN%20-%20Opening%20%20Otonoke%20by%20Creepy%20Nuts.mp3" },
];

const STORAGE_KEY = "kodigo-music:library";

export default function Library() {
    // init desde localStorage (lazy)
    const [albums, setAlbums] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : null;
            return Array.isArray(parsed) ? parsed : seed;
        } catch {
            return seed;
        }
    });

    const { favorites } = usePlayer();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // saved changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
    }, [albums]);

    const onAdd = (data) => {
        const item = {
            id: `local-${Date.now()}`,
            cover: data.cover || "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/music-logo-design.jpg",
            title: data.title.trim(),
            artist: data.artist.trim(),
            year: Number(data.year) || new Date().getFullYear(),
            previewUrl: data.preview || null,
        };
        setAlbums(prev => [item, ...prev]);
        reset();
    };

    const onClear = () => {
        if (confirm("¿Vaciar biblioteca local?")) {
            localStorage.removeItem(STORAGE_KEY);
            setAlbums(seed);
        }
    };

    const favSet = new Set(favorites);

    return (
        <section style={{ maxWidth: 1080, margin: "24px auto", padding: "0 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <h2 style={{ margin: "16px 0" }}>Biblioteca</h2>
                <button onClick={onClear} style={{ border: "1px solid #eee", background: "#fff", borderRadius: 12, padding: "8px 12px", cursor: "pointer" }}>
                    Vaciar local
                </button>
            </div>

            <form onSubmit={handleSubmit(onAdd)} style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr 120px", marginBottom: 16 }}>
                <input placeholder="Título" style={input} {...register("title", { required: "Título requerido" })} />
                <input placeholder="Artista" style={input} {...register("artist", { required: "Artista requerido" })} />
                <input placeholder="Año" type="number" style={input} {...register("year")} />
                <input placeholder="URL de portada (opcional)" style={{ gridColumn: "1 / span 2", ...input }} {...register("cover")} />
                <input placeholder="URL preview (mp3 opcional)" style={{ gridColumn: "1 / span 3", ...input }} {...register("preview")} />
                <button type="submit" style={btn}>Agregar</button>
            </form>
            <div style={{ color: "#b91c1c", marginBottom: 10 }}>
                {errors.title?.message || errors.artist?.message}
            </div>

            {favorites.length > 0 && (
                <>
                    <h3 style={{ margin: "12px 0" }}>⭐ Favoritos</h3>
                    <div style={grid}>
                        {albums.filter(a => favSet.has(a.id)).map(a => <AlbumCard key={a.id} {...a} />)}
                    </div>
                    <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #eee" }} />
                </>
            )}

            <h3 style={{ margin: "12px 0" }}>Todos</h3>
            <div style={grid}>
                {albums.map(a => <AlbumCard key={a.id} {...a} />)}
            </div>
        </section>
    );
}

const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 };
const input = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #ddd", outline: "none" };
const btn = { border: "none", background: "#111", color: "#fff", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontWeight: 700 };