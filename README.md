# Pokémon Battle App

Aplicación web para crear equipos Pokémon, buscar y filtrar Pokémon, y simular combates entre equipos. Desarrollada con ReactJS, Zustand, TanStack Query, TanStack Router, Testing Library y Vite.

---

## 🚀 Tecnologías principales

- **ReactJS** (19.1.0)
- **Zustand** (gestión de estado)
- **TanStack Query** (peticiones y caché de datos)
- **TanStack Router** (ruteo)
- **React Testing Library** (pruebas unitarias)
- **Vite** (entorno de desarrollo)
- **TailwindCSS** (estilos)
- **Axios** (peticiones HTTP)

---

## 📁 Estructura del proyecto

```
pokemon-battle-app/
├── src/
│   ├── api/                # Hooks para consumir la PokeAPI
│   ├── components/         # Componentes reutilizables de UI
│   ├── features/           # Features por dominio (teams, battle)
│   ├── layout/             # Layout principal y navegación
│   ├── routes/             # Configuración de rutas
│   ├── utils/              # Helpers y funciones comunes
│   ├── test/               # Pruebas unitarias
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🧑‍💻 Instalación y uso

1. Clona el repositorio:
   ```sh
   git clone https://github.com/alexiszanotti/pokemon-battle-app.git
   cd pokemon-battle-app
   ```
2. Instala dependencias:
   ```sh
   pnpm install (o tu gestor de paquetes)
   ```
3. Ejecuta en modo desarrollo:
   ```sh
   pnpm run dev (o tu gestor de paquetes)
   ```
4. Ejecuta las pruebas unitarias:
   ```sh
   pnpm run test (o tu gestor de paquetes)
   ```

---

## 🧪 Pruebas

- Lógica de combate entre equipos Pokémon.
- Filtrado y búsqueda de Pokémon por nombre y tipo.
- Comportamiento de la UI y flujos principales.

Las pruebas se encuentran en la carpeta `/src/test/`.

---

## ✨ Funcionalidades principales

- **Gestión de equipos:** Crea, guarda, elimina y reordena equipos Pokémon.
- **Buscador avanzado:** Filtra Pokémon por nombre y tipo.
- **Simulación de combate:** Elige dos equipos y simula el combate ronda a ronda, mostrando el ganador y el detalle de cada enfrentamiento.
- **Persistencia local:** Los equipos se guardan en el navegador usando localStorage.
- **Interfaz responsiva:** Adaptada para escritorio y móvil.

---

## ⚙️ Versiones y dependencias

- Node: v22.12.0
- React: 19.1.0
- Zustand: 5.0.6
- @tanstack/react-query: 5.83.0
- @tanstack/react-router: 1.127.3
- React Testing Library: 16.3.0
- Vite: 7.0.4
- Tailwindcss: 4.1.11
- Axios: 1.10.0

---

## 📌 Notas finales

La arquitectura está pensada para escalar nuevas funcionalidades fácilmente. Cada feature está desacoplada y el estado compartido se gestiona con Zustand. El consumo de la API es eficiente y cacheado gracias a TanStack Query. Las pruebas aseguran la calidad y el correcto funcionamiento de la lógica principal.
