# Kodigo Music — Single Page Application (React)

SPA inspirada en plataformas de música (Spotify/Deezer/Apple Music). Permite:
- Buscar música con **iTunes API** (sin API key) con filtros por **género** y **año**.
- Reproducir **previews de audio** (mini-player fijo con play/pause).
- **Agregar álbumes/canciones** manualmente a la Biblioteca.
- Marcar **favoritos** ⭐ (persisten en `localStorage`).
- Diseño **responsive** y accesible.

## 🚀 Demo / Producción
- **App en Vercel:** `https://kodigo-music-murex.vercel.app/`  
- **Repositorio:** `https://github.com/CristianHF29/kodigo-music.git`

---

## 🧩 Páginas y rutas
- `/` **Inicio**: héroe + buscador + tendencias (cargadas desde iTunes).
- `/library` **Biblioteca**: formulario para agregar y listado (con favoritos).
- `/contact` **Contacto**: formulario validado (React Hook Form o validación manual).

---

## ✨ Funcionalidades clave
- **Mini reproductor de previews** (componente `PlayerBar`) — se muestra al reproducir algo.
- **Favoritos** persistentes en `localStorage` (toggle ★ en cada tarjeta).
- **Buscador** con filtros (género y año mínimo) usando iTunes Search API.
- **UI Responsive**, inputs móviles con tamaño de fuente 16px (evita zoom en iOS).
- **Buenas prácticas**: componentes desacoplados, estado global mínimo con Context.

---

## 🛠️ Tecnologías
- **React + Vite**
- **react-router-dom**
- **react-hook-form** (para formularios)
- **iTunes Search API** (no requiere key)

---

## 📦 Estructura (resumen)
```bash
kodigo-music/
└─ src/
   ├─ components/
   │  ├─ Navbar.jsx
   │  ├─ Hero.jsx
   │  ├─ AlbumCard.jsx
   │  ├─ PlayerBar.jsx          # mini-player
   │  └─ SearchBar.jsx          # buscador con filtros
   ├─ pages/
   │  ├─ Home.jsx
   │  ├─ Library.jsx
   │  └─ Contact.jsx            # formulario validado
   ├─ PlayerProvider.jsx        # contexto: player + favoritos + audio
   ├─ assets/                   # imágenes (logo, etc.)
   ├─ App.jsx
   ├─ main.jsx
   └─ index.css
```

---

## ▶️ Correr localmente

```bash
# 1) Instalar dependencias
npm install

# 2) Modo desarrollo
npm run dev

# 3) Build de producción
npm run build

# 4) Previsualizar el build
npm run preview
```

---

# ▶️ Añadir canciones manualmente
## Links:

1. https://github.com/CristianHF29/filescontainer/raw/refs/heads/main DAN%20DA%20DAN%20-%20Opening%20%20Otonoke%20by%20Creepy%20Nuts.mp3

2. https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Praise%20With%20Everything%20%20Planetshakers%20Official%20Lyric%20Video%20-%20Planetshakers%20Resources.mp3

3. https://github.com/CristianHF29/filescontainer/raw/refs/heads/main/Super%20Mario%20Bros.%20Theme%20Song%20-%20ultragamemusic.mp3
