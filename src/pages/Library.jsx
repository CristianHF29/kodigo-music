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
    { id: "seed-8", cover: "https://i.ytimg.com/vi/Yc5VqWs43Q0/maxresdefault.jpg", title: "Where Our Blue Is", artist: "Tatsuya Kitani", year: 2023, previewUrl: "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/TV%E3%82%A2%E3%83%8B%E3%83%A1%E3%80%8E%E5%91%AA%E8%A1%93%E5%BB%BB%E6%88%A6%E3%80%8F%E7%AC%AC2%E6%9C%9F%E3%80%8C%E6%87%90%E7%8E%89%E3%83%BB%E7%8E%89%E6%8A%98%E3%80%8D%E3%83%8E%E3%83%B3%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88OP%E3%83%A0%E3%83%BC%E3%83%93%E3%83%BC%EF%BC%8FOP%E3%83%86%E3%83%BC%E3%83%9E%EF%BC%9A%E3%82%AD%E3%82%BF%E3%83%8B%E3%82%BF%E3%83%84%E3%83%A4%E3%80%8C%E9%9D%92%E3%81%AE%E3%81%99%E3%81%BF%E3%81%8B%E3%80%8D%EF%BD%9C%E6%AF%8E%E9%80%B1%E6%9C%A8%E6%9B%9C%E5%A4%9C11%E6%99%8256%E5%88%86%EF%BD%9EMBS_TBS%E7%B3%BB%E5%88%97%E5%85%A8%E5%9B%BD28%E5%B1%80%E3%81%AB%E3%81%A6%E6%94%BE%E9%80%81%E4%B8%AD!!%20-%20TOHO%20animation%20%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB.mp3" },
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
            previewUrl: data.preview || "https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Gourmet%20Race%20-%20Kirby_%20Super%20Star.mp3",
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