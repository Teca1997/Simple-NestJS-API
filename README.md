# Simple-NestJS-API

A modular, scalable RESTful API boilerplate built with [NestJS](https://nestjs.com/) and TypeScript. This project is designed for real-world applications—focusing on best practices, maintainability, and extensibility.

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Modules](#modules)
  - [Auth](#auth)
  - [Users](#users)
  - [Roles](#roles)
  - [Tokens](#tokens)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [Configuration and Tooling](#configuration-and-tooling)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **NestJS Framework:** Enjoy modular architecture, dependency injection, and a powerful CLI.
- **TypeScript:** Type safety and modern language features.
- **Authentication & Authorization:** Ready-to-extend modules for Auth, Roles, and Tokens.
- **User Management:** Full-featured user module with DTOs and entity separation.
- **Testing:** Built-in support for unit and integration tests (Jest).
- **Code Quality:** Integrated ESLint, Prettier, and strict TS configs.
- **Extensible:** Easy to add new modules and features.

---

## Architecture Overview

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── auth/
├── users/
├── roles/
├── tokens/
├── common/
├── enums/
├── database/
├── utils/
```

- **app.module.ts:** Root module, imports and configures all feature modules.
- **main.ts:** Application bootstrap file.
- **common, enums, database, utils:** Utility modules, helpers, and shared code.

---

## Modules

### Auth

Handles authentication logic.

- **Controller:** [`auth.controller.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/auth/auth.controller.ts) — defines authentication endpoints (e.g., login, registration).
- **Service:** [`auth.service.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/auth/auth.service.ts) — contains business logic for authentication, token management, etc.
- **Module:** [`auth.module.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/auth/auth.module.ts) — encapsulates the auth domain.
- **Strategies & Pipes:** Extensible for custom authentication strategies and request validation.

### Users

User management (CRUD operations, registration, lookup).

- **Controller:** [`users.controller.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/users/users.controller.ts) — handles user-related API endpoints.
- **Service:** [`users.service.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/users/users.service.ts) — user logic and data access.
- **Module:** [`users.module.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/users/users.module.ts)
- **DTOs:** Located in [`src/users/dto/`](https://github.com/Teca1997/Simple-NestJS-API/tree/development/src/users/dto) for request validation.
- **Entities:** Located in [`src/users/entities/`](https://github.com/Teca1997/Simple-NestJS-API/tree/development/src/users/entities) for ORM/database mapping.

### Roles

Role-based access control.

- **Controller:** [`roles.controller.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/roles/roles.controller.ts) — endpoints for managing roles.
- **Service:** [`roles.service.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/roles/roles.service.ts) — logic for roles and permissions.
- **Module:** [`roles.module.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/roles/roles.module.ts)
- **Entities:** Located in [`src/roles/entities/`](https://github.com/Teca1997/Simple-NestJS-API/tree/development/src/roles/entities)

### Tokens

Session and refresh token management.

- **Service:** [`tokens.service.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/tokens/tokens.service.ts)
- **Module:** [`tokens.module.ts`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/src/tokens/tokens.module.ts)
- **Entities:** Located in [`src/tokens/entities/`](https://github.com/Teca1997/Simple-NestJS-API/tree/development/src/tokens/entities)

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- Yarn or npm

### Installation

```bash
yarn install
# or
npm install
```

### Running the API

```bash
yarn start:dev
# or
npm run start:dev
```

API will be available by default at `http://localhost:3000`.

---

## Scripts

Common scripts (see [`package.json`](https://github.com/Teca1997/Simple-NestJS-API/blob/development/package.json)):

- **`start:dev`** – Run in development mode with hot reload.
- **`build`** – Compile TypeScript.
- **`lint`** – Lint code with ESLint.
- **`test`** – Run unit tests.
- **`test:e2e`** – Run end-to-end tests.
- **`format`** – Auto-format code using Prettier.

---

## Testing

- **Unit and Integration:** Jest is preconfigured; test specs are co-located with code.
- **Run tests:**
  ```bash
  yarn test
  yarn test:e2e
  ```

---

## Configuration and Tooling

- **ESLint:** `.eslintrc.js` defines linting rules.
- **Prettier:** `.prettierrc` manages code style.
- **Jest:** `jest.config.ts` for testing.
- **Nest CLI:** `nest-cli.json` for project structure.
- **Webpack:** `webpack.config.ts` for builds.
- **TypeScript:** `tsconfig.json` and `tsconfig.build.json`.

---

## Contributing

1. Fork the repository and clone your fork.
2. Create a new branch for your feature or fix.
3. Open a Pull Request with clear description.

---

## License

Specify your project license here.

---

**Note:**  
- This README covers the main structure and features, but more modules may exist.  
- See the [`src/`](https://github.com/Teca1997/Simple-NestJS-API/tree/development/src) directory for all features and endpoints.

---

*Generated by GitHub Copilot based on the current file structure and best practices. For more details, explore the code and module contents!*
