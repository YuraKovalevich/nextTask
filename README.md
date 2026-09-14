# Store

**Deploy:** https://store4242.netlify.app/

---

## Features

- Built with **Next.js App Router**
- **React + TypeScript**
- Server-side rendering (SSR)
- Global state management with **Zustand**
- Product catalog
- Product details pages
- Shopping cart
- Wishlist (favorites)
- Login page

---

## Dependencies

### Main

- **next**
- **react**
- **react-dom**
- **@tanstack/react-query** — server state and data fetching
- **zustand** — global state management
- **react-hook-form** — form handling
- **@hookform/resolvers** — integration between React Hook Form and Zod
- **zod** — schema validation
- **react-icons** — icon library

### Dev Dependencies

- **typescript**
- **vitest** — testing framework
- **@types/react**
- **@types/react-dom**
- **@types/node**
- **tailwindcss**
- **@tailwindcss/postcss**
- **@biomejs/biome** — linting and formatting
- **lefthook** — git hooks management
---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YuraKovalevich/nextTask.git
cd nextTask
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Start development mode

``` bash
npm run dev
```
------------------------------------------------------------------------
## Project Structure
    public/
    src/
    ├── app/
    │   ├── cart/
    │   ├── login/
    │   ├── products/
    │   ├── wishlist/
    │   ├── store/
    │   ├── types/
    │   ├── utils/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    .gitignore
    biome.json
    lefthook.yml
    next.config.ts
    next-env.d.ts
    package.json
    postcss.config.mjs
    tsconfig.json
    README.md

------------------------------------------------------------------------


