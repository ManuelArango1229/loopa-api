# 📌 Proyecto: Habit Tracker

Este repositorio contiene el backend del proyecto **Habit Tracker**, desarrollado en **Node.js** con **TypeScript** bajo una **arquitectura hexagonal con vertical slicing**.

## 🚀 Tecnologías

- **Lenguaje**: TypeScript
- **Framework**: Node.js (Express)
- **Base de Datos**: PostgreSQL (Remoto en NeonDB)
- **ORM**: Prisma o TypeORM
- **Autenticación**: JWT y OAuth
- **CI/CD**: GitHub Actions
- **Infraestructura**: Docker y Kubernetes

## 📂 Estructura del Repositorio

```bash
📦 habit-tacker-api
├── 📂 src
│   ├── 📂 modules
│   │   ├── 📂 users
│   │   │   ├── 📂 application
│   │   │   ├── 📂 domain
│   │   │   ├── 📂 infrastructure
│   │   │   └── 📂 presentation
│   ├── 📂 shared
│   ├── 📂 config
│   ├── index.ts
├── 📜 .env.example
├── 📜 .gitignore
├── 📜 README.md
└── 📜 package.json
```

## 🔧 Configuración Inicial

1. Clonar el repositorio:

   ```bash
   git clone [URL_DEL_REPO]
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar variables de entorno:

   ```bash
   cp .env.example .env
   ```

   - Agregar las credenciales de la base de datos **NeonDB**.
   - Configurar los secretos de JWT y OAuth.

4. Levantar el entorno de desarrollo:

   ```bash
   npm run dev
   ```

## ✅ Convenciones y Buenas Prácticas

- Seguir **conventional commits** para los mensajes de commit.
- Mantener una estructura modular y separación de capas.
- Escribir pruebas unitarias con Jest antes de hacer un merge.

## 🛠️ CI/CD

- **CI**: Validación con **ESLint, Prettier, Jest y pruebas de integración**.
- **CD**: Despliegue automatizado en [Cloud Provider].

## 📄 Licencia

Este proyecto está bajo la licencia **Apache 2.0**.

---

_Última actualización: 31 Marzo 2025_
