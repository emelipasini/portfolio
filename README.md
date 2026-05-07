# Professional Portfolio Website + API 🚀

![CI Pipeline](https://github.com/emelipasini/portfolio/actions/workflows/main.yml/badge.svg)
![codecov](https://codecov.io/gh/emelipasini/portfolio/graph/badge.svg)

This repository houses the **Professional Portfolio Website + API**, a robust backend service designed to showcase my journey as a Full Stack Developer. Built with a focus on **Clean Code**, type safety, and industry-standard engineering practices.

- 🌐 Live Demo: [emelipasini.com](https://emelipasini.com)
- 📖 Live API: [Swagger UI](https://emelipasini.com)
- 🧪 Tests Coverage report: [Codecov](https://app.codecov.io/github/emelipasini/portfolio)

**Core Metrics:**

- 🟢 **Coverage:** 100% (Strictly enforced by Vitest & Codecov)
- 🏗️ **Architecture:** Clean Architecture / Modular Monolith
- 🚀 **CI/CD:** GitHub Actions + Codecov (Fail-fast pipeline)

## 🛠️ Architecture & Tech Stack

This project is built with a focus on performance, maintainability, and clean architecture:

- **Frontend**: Responsive UI built with EJS (Embedded JavaScript templates) and CSS3/SCSS, ensuring a lightweight and server-side rendered experience.
- **Backend**: Powered by Node.js and Express, written in TypeScript for robust type safety and better developer experience.
- **API Standards**:
    - **Zod**: Schema validation and runtime type safety for all incoming data.
    - **Swagger (OpenAPI)**: Interactive documentation accessible via `/api/docs` for seamless endpoint exploration.
    - **Pino**: High-performance structured logging for real-time monitoring and debugging.

## 🛡️ Quality Assurance & CI/CD

The project maintains a 100% coverage policy. The CI/CD pipeline is configured to fail if any new code is missing tests or if any logic branch remains uncovered.

- **Testing Suite:** Unit and integration tests powered by [Vitest](https://vitest.dev/), focusing on core business logic.
- **Coverage Oversight:** Real-time tracking via [Codecov](https://codecov.io/) to maintain high standards and prevent regressions.
- **Fail-Safe Environments:** Strict runtime schema validation with [Zod](https://zod.dev/) to ensure the app never starts with invalid configurations.
- **Automated Gates:** CI/CD workflows that block unstable code from reaching the main branch.

## ⚙️ Engineering Standards

I prioritize code quality and maintainability through a strictly automated workflow:

- **Linting & Formatting:** ESLint and Prettier for consistent, error-free code.
- **Git Hooks (Husky):**
    - **Pre-commit:** Automated unit testing and linting verification.
    - **Commitlint:** Enforcement of **Conventional Commits** for a readable and traceable project history.
    - **CI/CD Ready:** High test coverage and standardized environment configurations ensure regression-free deployments.

## ✨ Key Features & Engineering Pillars

- **🛡️ Bulletproof Reliability:** Comprehensive test suite with **Vitest** and **Codecov**, ensuring 100% coverage and regression-free updates.
- **🛠️ Strict Type Safety:** Runtime validation via **Zod** combined with TypeScript's compile-time checks for end-to-end data integrity.
- **📖 Self-Documenting API:** Fully interactive **Swagger (OpenAPI 3.0)** documentation.
- **🪵 Observability:** Structured, high-performance logging with **Pino**, ready for production monitoring.
- **🤖 Automated Workflow:** Zero-config consistency with Husky, Commitlint, and automated Linting.

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

2. **Set up Environment Variables:**

Copy the example env file and fill in your values:

```shell
cp .env.example .env
```

3. **Run the following commands:**

```shell
npm install
npm run build
npm start
```

4. **Access the application:**

Open `http://localhost:3000` as shown in your console.

## 📊 Tests Coverage

### In cloned repository

1. **Run the following commands:**

```shell
npm run test:coverage
npm run test:ui
```

### Online

[Codecov](https://app.codecov.io/github/emelipasini/portfolio)

<details>
<summary>See the coverage graph</summary>

### Codecov Sunburst

![Codecov Sunburst](https://codecov.io/gh/emelipasini/portfolio/graphs/sunburst.svg)

_This graphic shows the tests distribution in the entire project._

</details>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
