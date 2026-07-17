# Agent Guidelines for HroiGo (Andaman Trails)

This repository contains the frontend files for **HroiGo (Andaman Trails)**, a Southern Thailand Travel Log & Dashboard application.

All AI Agents working on this project **MUST** adhere to the following rules and instructions.

---

## 🚀 Critical Git Rule: Automatic Commit & Push

> [!IMPORTANT]
> **You MUST commit and push all changes to the remote repository immediately after completing any edit, modification, or addition.**

For every change you make (whether editing HTML, CSS, JavaScript, adding images, or updating documentation):
1. **Verify the change** is correct.
2. **Stage the changes**: Run `git add <changed_files>` (or `git add .`).
3. **Commit the changes**: Run `git commit -m "<type>: <description>"` with a clear and descriptive message.
4. **Push the changes**: Run `git push` immediately to update the remote repository.

Do not wait for multiple edits to accumulate before committing. Commit and push step-by-step.

---

## 🛠️ Tech Stack & Code Guidelines

- **Frontend**: Pure HTML5, Vanilla CSS, and Vanilla JavaScript.
- **Styling**: Always use the CSS variables defined in [style.css](file:///C:/Users/natthida/trip/style.css).
- **Files**:
  - Main HTML: [trip.html](file:///C:/Users/natthida/trip/trip.html)
  - Layout & Styling: [style.css](file:///C:/Users/natthida/trip/style.css)
  - Logic & Animation: [app.js](file:///C:/Users/natthida/trip/app.js)
  - Assets: Located in the `image/` directory.

---

## 🎨 Design Philosophy

- **Aesthetics**: Preserve the coastal, clean, modern Andaman-inspired design theme.
- **Responsiveness**: Ensure the dashboard grid and layout adapt perfectly to different viewport sizes.
- **Interactions**: Maintain smooth transitions (such as the banner slideshow crossfade) and micro-interactions on hover.
