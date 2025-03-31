# Workspace Deployer — Frontend (`wsd-web`)

**Workspace Deployer** is a web app that allows users to generate single-click executables (binaries) that open files, directories, and URLs on their local system. This repository contains the **frontend** portion of the app — a UI built with TypeScript and Next.js that interacts with the backend service to create platform-specific Go binaries.

---

## 🚀 Features

- Intuitive UI to build custom workspace launchers  
- Query the backend to generate Go binaries on-demand  
- Simple environment configuration for API endpoints  
- Cross-platform support via backend Go services  

---

## 🧱 Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)  
- **Language**: TypeScript  
- **Package Manager**: npm  

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/wsd-web.git
cd wsd-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env.local file in the root with the following variables:

```bash
API_BASE=<base_url>
API_ROUTES=<route_path>
API_KEY=<api_key>
```

These environment variables are used to interact with the backend API that handles binary creation and OS-specific behavior.

### 4. Run the development server

```bash
npm run dev
```


🧠 How It Works

    The frontend gathers user input for file paths, URLs, and desired config

    It sends this data to the backend (not in this repo)

    The backend compiles a small Go binary that opens the specified paths/URLs

    The frontend receives the download link and serves it to the user

🛠 Backend

This repo only includes the frontend. The Go backend handles the logic for:

    Binary bundling

    OS-specific path handling

    Script execution logic

Make sure the backend services are running and accessible via the configured environment variables.


📸 Screenshots / Demo

...Coming soon 


🤝 Contributing

PRs welcome! If you have ideas for improving the UI or extending functionality, feel free to fork and submit a pull request.
📄 License
