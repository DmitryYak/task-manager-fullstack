T1 — база данных (PostgreSQL)
docker-compose up -d

T2 — backend (API)
cd backend
npm run dev
API: http://localhost:3000

Используется фронтендом:
fetch("http://localhost:3000/tasks")

T3 — frontend (UI)
cd frontend
npx serve -l 5500
UI: http://localhost:5500
Статика + JS

T4 — e2e тесты (Playwright)
cd e2e
npx playwright test
с браузером:
npx playwright test --headed
