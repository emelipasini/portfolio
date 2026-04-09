# Professional Portfolio Website + API 🚀

![CI Pipeline](https://github.com/emelipasini/portfolio/actions/workflows/main.yml/badge.svg)

This repository houses the **Professional Portfolio Website + API**, a robust backend service designed to showcase my journey as a Full Stack Developer. Built with a focus on **Clean Code**, type safety, and industry-standard engineering practices.

- 🌐 Live Demo: [emelipasini.com](https://emelipasini.com)
- 📖 Live API: [Swagger UI](https://emelipasini.com)

## 🛠️ Architecture & Tech Stack

This project is built with a focus on performance, maintainability, and clean architecture:

- **Frontend**: Responsive UI built with EJS (Embedded JavaScript templates) and CSS3/SCSS, ensuring a lightweight and server-side rendered experience.
- **Backend**: Powered by Node.js and Express, written in TypeScript for robust type safety and better developer experience.
- **API Standards**:
    - **Zod**: Schema validation and runtime type safety for all incoming data.
    - **Swagger (OpenAPI)**: Interactive documentation accessible via `/api/docs` for seamless endpoint exploration.
    - **Pino**: High-performance structured logging for real-time monitoring and debugging.
- **Quality Assurance**:
    - **Vitest**: Modern testing suite ensuring high code coverage and regression-free deployments.
    - **ESLint & Prettier**: For consistent code style and bug prevention.
    - **Husky**: Automated pre-commit hooks that run unit tests and linting verification.
    - **Commitlint**: Enforcing conventional commit messages for a clear and professional project history.

## ⚙️ Engineering Standards

I prioritize code quality and maintainability through a strictly automated workflow:

- **Linting & Formatting:** ESLint and Prettier for consistent, error-free code.
- **Git Hooks (Husky):**
    - **Pre-commit:** Automated unit testing and linting verification.
    - **Commitlint:** Enforcement of **Conventional Commits** for a readable and traceable project history.
    - **CI/CD Ready:** High test coverage and standardized environment configurations ensure regression-free deployments.

## ✨ Key Features

- **Type-Safe Development:** End-to-end type safety using TypeScript and runtime validation via **Zod**.
- **Interactive Documentation:** Explore and test endpoints directly through the integrated **Swagger UI**.
- **Structured Logging:** Real-time monitoring and debugging with **Pino**.
- **High Reliability:** Comprehensive testing suite with **Vitest** to guarantee core functionality.
- **Standardized History:** A professional-grade commit history for better collaboration and traceability.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
- **Modern Workflow:** Implements a professional development pipeline with automated linting and formatting.
- **Clean Structure:** Organized modularly to allow for easy scaling and updates of new projects.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation and Running

1. **Clone the repository:**

```shell
git clone https://github.com/emelipasini/portfolio.git
cd portfolio
```

2. **Run the following commands:**

```shell
npm install
npm run build
npm start
```

3. **Open your browser in the url that shows the console.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
