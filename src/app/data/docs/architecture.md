# 🧱 Project Architecture Overview

This Angular project follows a modular architecture divided into four main layers:

## 📁 core/

Contains app-level logic, singleton services, interceptors, guards, and global configurations.

## 📁 data/

Manages all data-related logic such as models, db, interfaces and state management.
Also includes documentation under `data/docs/`.

## 📁 routes/

Contains the main navigation structure:

- `routing/` → feature routing modules
- `pages/` → top-level pages
- `guards/`, `resolvers/` → route-specific logic

## 📁 shared/

Reusable components, directives, and pipes shared across multiple modules.

---
