# Tic Tac Foe

This is an educational project aimed at getting to know about:

- Vue 3
- Vite
- TypeScript
- Biome
- Vitest
- OpenAI
- Vercel

It also explores project architecture, including a main project and a separate Vite project for backend code bundling. This approach results in a more robust backend compared to typical beginner-level examples.

The project implements a Tic Tac Toe game with an AI bot (a crappy one) and is deployed on Vercel.

This template should help get you started developing more complex applications with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Project Overview

This project is built using:

- **Vue 3** (with [`<script setup>`](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) syntax)
- **TypeScript**
- **Vite**

The codebase is organized into three main parts:

1. `src`: Frontend code
2. `api-src`: Backend code
3. `shared`: Code shared between frontend and backend

## Key Features

### Code Quality
- **[Biome](https://biomejs.dev/)**: Used for linting and formatting

### Testing
- **[Vitest](https://vitest.dev/)**: Implemented for robust testing

### Backend
- **[Vercel's Serverless Functions](https://vercel.com/docs/functions)**: Utilized for backend functionality

### AI Integration
- **[OpenAI's API](https://platform.openai.com)**: Employed for bot functionality
  - Includes secure management of the OpenAI API key
