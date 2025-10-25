# My Blog App (Blogit)

A modern, full-stack, production-ready blog application built with React, Vite, and Appwrite.

## Features

* **Full CRUD Functionality:** Create, Read, Update, and Delete posts.
* **User Authentication:** Secure user signup and login (Email/Password).
* **Rich Text Editor:** A complete WYSIWYG (TinyMCE) editor for creating and editing posts.
* **File Uploads:** Upload featured images to Appwrite Storage.
* **Theme Switching:** A modern, class-based dark/light mode toggle.
* **Profile Page:** A dedicated page for logged-in users to see their info and posts.
* **Protected Routes:** Client-side routing that protects pages like "Add Post" and "Profile."
* **Dynamic Post Previews:** All posts are displayed with their featured image on the home page.
* **Animated UI:** Smooth, eye-catching hover effects on post cards.

---

## Tech Stack

This project uses a modern, full-stack JavaScript-based architecture.

### Frontend
* **Core:** React 18
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **State Management:** Redux Toolkit (for auth state)
* **Styling:** Tailwind CSS (with dark mode)
* **Form Handling:** React Hook Form
* **Rich Text Editor:** TinyMCE for React (`@tinymce/tinymce-react`)
* **Context:** React Context API (for theme switching)
* **HTML Parsing:** `html-react-parser`

### Backend (BaaS)
* **Backend:** Appwrite
* **Services Used:**
    * **Appwrite Auth:** For user authentication.
    * **Appwrite Databases:** For storing user and post data.
    * **Appwrite Storage:** For hosting featured images.

### Deployment
* **Hosting:** GitHub Pages
* **CI/CD:** GitHub Actions

* **Visit website here ->** https://shubh3008-tech.github.io/My-Blog/
