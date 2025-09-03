import { usePlayer } from "../PlayerProvider";

export default function PlayerBar() {
    const { track, isPlaying, togglePlay } = usePlayer();
    if (!track) return null;

    return (
        <div style={{
            position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 40,
            background: "#111", color: "#fff", borderRadius: 14,
            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
            boxShadow: "0 8px 24px rgba(0,0,0,.25)"
        }}>
            <img src={track.cover} alt="" style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover" }} />
            <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.title}</div>
                <div style={{ color: "#bbb", fontSize: 14 }}>{track.artist}</div>
            </div>
            <button
                onClick={togglePlay}
                style={{ border: "none", background: "#fff", color: "#111", fontWeight: 800, borderRadius: 12, padding: "8px 14px", cursor: "pointer" }}
            >
                {isPlaying ? "⏸" : "▶️"}
            </button>
        </div>
    );
}
