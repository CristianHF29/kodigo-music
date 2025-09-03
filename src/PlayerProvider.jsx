import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const Ctx = createContext(null);
const FAVS_KEY = "kodigo-music:favorites";

export function PlayerProvider({ children }) {
    const audioRef = useRef(null);

    // current track
    const [track, setTrack] = useState(null); // {title, artist, cover, previewUrl}
    const [isPlaying, setIsPlaying] = useState(false);

    // favorites (ids string)
    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem(FAVS_KEY)) || []; } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem(FAVS_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // play / pause
    const play = (t) => {
        setTrack(t);
        setIsPlaying(true);
    };
    const togglePlay = () => setIsPlaying(p => !p);

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        if (track?.previewUrl) {
            el.src = track.previewUrl;
            isPlaying ? el.play()?.catch(() => { }) : el.pause();
        } else {
            el.pause();
        }
    }, [track, isPlaying]);

    const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };
    const isFavorite = (id) => favorites.includes(id);

    const value = useMemo(() => ({
        track, isPlaying, play, togglePlay,
        favorites, toggleFavorite, isFavorite,
        audioRef,
    }), [track, isPlaying, favorites]);

    return (
        <Ctx.Provider value={value}>
            {children}
            {/* preview audio */}
            <audio ref={audioRef} />
        </Ctx.Provider>
    );
}

export const usePlayer = () => useContext(Ctx);