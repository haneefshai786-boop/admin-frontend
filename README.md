# Admin Full Panel (Upgraded)

## Features
- React + Vite
- Tailwind CSS
- Axios client with auth helper
- Login (admin)
- Dashboard counts
- CRUD: Vendors, Categories, Subcategories, Products
- Protected routes (client-side)

## Setup
1. unzip
2. npm install
3. npx tailwindcss init -p   (tailwind already in devDependencies)
4. npm run dev

## Notes
- Set VITE_API_URL in `.env` to your backend API (e.g. http://localhost:5000)
- Login uses `/api/admin/login` route and expects `{ token }` in response
