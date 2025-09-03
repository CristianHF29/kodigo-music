import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AlbumCard from "../components/AlbumCard";
import { usePlayer } from "../PlayerProvider";

const seed = [
    { id: "seed-1", cover: "https://i.ytimg.com/vi/NTa6Xbzfq1U/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-BIAC4AOKAgwIABABGDYgUSh_MA8=&rs=AOn4CLAH_yP9JtFv1JMErBLgfajKEsG5Kg", title: "Super MARIO BROS", artist: "Koji Kondo", year: 1986, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Super%20Mario%20Bros.%20Theme%20Song%20-%20ultragamemusic.mp3" },
    { id: "seed-2", cover: "https://i1.sndcdn.com/artworks-000601263640-q7qo1x-t500x500.jpg", title: "Gurenge", artist: "LiSA", year: 2019, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Demon%20Slayer%20-%20Opening%201%20%204K%20%2060FPS%20%20Creditless%20%20-%20Anicrad.mp3" },
    { id: "seed-3", cover: "https://i.ytimg.com/vi/qPdPjWkJZF8/sddefault.jpg", title: "Dandadan", artist: "Okotone", year: 2024, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/DAN%20DA%20DAN%20-%20Opening%20%20Otonoke%20by%20Creepy%20Nuts.mp3" },
    { id: "seed-4", cover: "https://i.scdn.co/image/ab67616d0000b2733362b91181f7a9568f4816a1", title: "Migrane", artist: "Twenty One Pilots", year: 2013, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Twenty%20One%20Pilots%20-%20Migraine%20captured%20in%20The%20Live%20Room.mp3" },
    { id: "seed-5", cover: "https://www.planetshakers.com/wp-content/uploads/2025/07/PraiseWithEverything_AlbumCover_4000x4000-scaled.jpg", title: "Praise With Everything", artist: "Planetshakers", year: 2025, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Praise%20With%20Everything%20%20Planetshakers%20Official%20Lyric%20Video%20-%20Planetshakers%20Resources.mp3" },
    { id: "seed-6", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-UhXOKR_ZSVc1RBaBSlE0i1cnWJqhydvyQ&s", title: "Relevo", artist: "Misael J", year: 2023, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Relevo%20-%20Misael%20J%20(Video%20Oficial)%20-%20Misael%20J.mp3" },
    { id: "seed-7", cover: "https://cdn-images.dzcdn.net/images/cover/487413b8c0925c636f3722324b9321d6/0x1900-000000-80-0-0.jpg", title: "Redencion", artist: "Misael J", year: 2023, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Redencion%20-%20Misael%20J%20(Video%20Lyric%20Oficial)%20-%20Misael%20J.mp3" },
    { id: "seed-8", cover: "data:image/jpeg;base64,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", title: "Where Our Blue Is", artist: "Tatsuya Kitani", year: 2023, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/TV%E3%82%A2%E3%83%8B%E3%83%A1%E3%80%8E%E5%91%AA%E8%A1%93%E5%BB%BB%E6%88%A6%E3%80%8F%E7%AC%AC2%E6%9C%9F%E3%80%8C%E6%87%90%E7%8E%89%E3%83%BB%E7%8E%89%E6%8A%98%E3%80%8D%E3%83%8E%E3%83%B3%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88OP%E3%83%A0%E3%83%BC%E3%83%93%E3%83%BC%EF%BC%8FOP%E3%83%86%E3%83%BC%E3%83%9E%EF%BC%9A%E3%82%AD%E3%82%BF%E3%83%8B%E3%82%BF%E3%83%84%E3%83%A4%E3%80%8C%E9%9D%92%E3%81%AE%E3%81%99%E3%81%BF%E3%81%8B%E3%80%8D%EF%BD%9C%E6%AF%8E%E9%80%B1%E6%9C%A8%E6%9B%9C%E5%A4%9C11%E6%99%8256%E5%88%86%EF%BD%9EMBS_TBS%E7%B3%BB%E5%88%97%E5%85%A8%E5%9B%BD28%E5%B1%80%E3%81%AB%E3%81%A6%E6%94%BE%E9%80%81%E4%B8%AD!!%20-%20TOHO%20animation%20%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB.mp3" },
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

const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, padding: "1rem" };
const input = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid #ddd", outline: "none" };
const btn = { border: "none", background: "#111", color: "#fff", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontWeight: 700 };