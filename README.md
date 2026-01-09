# 🚀 React Enhanced Todo List

A modern, responsive, and feature-rich Todo List application built to master **React** fundamentals.
This project started as a simple tutorial but evolved into a fully personalized application with custom UI, logic improvements, and Tailwind CSS v4 styling.

![Project Preview](path-to-your-screenshot.png)
> *Note: A live preview of the application showing the dark mode interface and task management.*

## 🌟 Objective

The goal of this project is to transition from **Vanilla JavaScript** to **React** by building a real-world application.
Instead of just copying code, I focused on understanding the core concepts: **Immutability**, **State Management**, and **Component Architecture**.

## 🛠️ Built With

* **React (Vite)** - For the component-based UI architecture.
* **Tailwind CSS (v4)** - Using the new `@theme` configuration for a custom design system.
* **JavaScript (ES6+)** - Leveraging arrow functions, destructing, and array methods (`map`, `filter`).
* **Google Fonts** - Integrated `Outfit`, `Space Grotesk`, and `Inter` via CSS variables.

## ✨ Features

### ✅ Currently Implemented
* **Smart Task Management (CRUD):**
    * **Add:** Dynamic task creation with proper state updates.
    * **Delete:** Removal of tasks using ID-based filtering logic (`.filter()`).
    * **Render:** Efficient list rendering using `.map()` with unique keys.
* **User Experience (UX):**
    * **Empty State:** A friendly "No tasks yet" message appears when the list is cleared (Conditional Rendering).
    * **Input Actions:** The "Add" button is visually integrated inside the input field for a sleek look.
    * **Interactive UI:** Hover effects, cursor pointers, and active states on buttons.
* **Modern Design:**
    * **Dark Mode Native:** A deep slate theme with Neon Pink/Green accents.
    * **Typography:** Custom fonts setup for headings vs. body text.
    * **Responsive:** Fully adapted for mobile and desktop screens.

### 🚀 Roadmap (Future Improvements)
* [ ] **Edit Mode:** Ability to modify an existing task content.
* [ ] **Local Storage:** Persist tasks so they don't disappear on refresh.
* [ ] **Validation:** Prevent adding empty tasks or duplicates.
* [ ] **Task Completion:** Toggle items as "Done" (strikethrough style).

## 💡 Key Learnings

Building this project helped me solidify several React concepts:

1.  **State Management (`useState`):**
    * I learned that state is immutable. To add an item, I use `setList([...list, newItem])` instead of `list.push()`.
2.  **Props & Component Communication:**
    * Passing data (`itemData`) and functions (`deleteTodo`) from the Parent (`App`) to the Child (`ListItem`).
3.  **Conditional Rendering:**
    * Using `{list.length === 0 && <Message />}` to handle empty states cleanly.
4.  **Tailwind v4 Configuration:**
    * Learned how to configure fonts and theme variables directly in CSS using the `@theme` block, replacing the old config file.

## 📂 Project Structure

```
src/
├── components/
│   └── ListItem.jsx   # Child component: Displays a single task + delete logic
├── App.jsx            # Parent component: Manages State (list) & Form logic
├── index.css          # Global styles + Tailwind @theme configuration
└── main.jsx           # Entry point (Vite)

```

👨‍💻 Author

AnouPro
GitHub: @AnouGeek

Goal: Becoming a proficient React Developer (Next.js & TypeScript focus).![Aperçu du projet](./screenshot.png)
