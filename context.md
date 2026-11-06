# Project Context: ToDo Full-Stack Application (Spring Boot + React)

## 1. Overview & Purpose
This repository contains a full-stack **To-Do List Application**:
- **Backend:** A RESTful Spring Boot application connected to MySQL, implementing CRUD operations, case-insensitive keyword search, completion toggling ("cut mark"), and badge count metrics. OpenAPI & Scalar provide interactive documentation.
- **Frontend:** A clean, simple, and intuitive React SPA (Vite). It keeps related components inside their own feature folders (`components/Navbar/` and `components/Tasks/`) while keeping `App.jsx` clean and concise with only 3 component imports.

---

## 2. Project File Tree

```text
toDo/
├── context.md                                  # Full project reference & documentation
├── pom.xml                                     # Spring Boot dependencies & Maven plugins
├── mvnw / mvnw.cmd                             # Maven wrapper executables
│
├── src/                                        # BACKEND (Spring Boot + MySQL)
│   ├── main/
│   │   ├── java/List/toDo/
│   │   │   ├── config/
│   │   │   │   └── OpenApiConfig.java          # OpenAPI / Swagger configuration
│   │   │   ├── controller/
│   │   │   │   └── TaskController.java         # REST API endpoints & input validation
│   │   │   ├── model/
│   │   │   │   └── Task.java                   # JPA Entity representing 'tasks' table
│   │   │   ├── repository/
│   │   │   │   └── TaskRepository.java         # Spring Data JPA repository
│   │   │   ├── service/
│   │   │   │   └── TaskService.java            # Business logic layer
│   │   │   └── ToDoApplication.java            # Spring Boot entry point
│   │   └── resources/
│   │       ├── application.properties          # Port (8080), MySQL credentials, JPA & Scalar config
│   │       └── static/
│   │           └── scalar.html                 # Scalar API Reference web page
│   └── test/
│       └── java/List/toDo/
│           └── ToDoApplicationTests.java       # Backend integration tests
│
└── frontend/                                   # FRONTEND (React + Vite)
    ├── package.json                            # Dependencies & scripts
    ├── vite.config.js                          # Vite config with /api proxy to :8080
    ├── index.html                              # Webpage entry point
    └── src/
        ├── services/                           # API Layer
        │   └── taskApi.js                      # Direct API functions for backend endpoints
        │
        ├── components/                         # Feature-Organized Components
        │   ├── Navbar/
        │   │   └── Navbar.jsx                  # Header with brand, badge count, & buttons
        │   │
        │   └── Tasks/                          # All Task-related components
        │       ├── TaskList.jsx                # Search bar, filter tabs, & renders TaskCards
        │       ├── TaskCard.jsx                # Task card with cut-mark toggle, edit, & delete
        │       └── TaskModal.jsx               # Dialog for adding and editing tasks
        │
        ├── App.jsx                             # Clean main page: imports Navbar, TaskList, TaskModal
        ├── App.css                             # Application styling & animations
        ├── index.css                           # Global resets & theme variables
        └── main.jsx                            # React mount point
```

---

## 3. How the Frontend Works (Simple & Modular)

- **`services/taskApi.js`**: Contains plain `async/await` fetch functions for the 7 backend operations (`getAllTasks`, `getTaskCount`, `createTask`, `updateTask`, `toggleCutMark`, `deleteTask`, `clearAllTasks`).
- **`components/Navbar/Navbar.jsx`**: Renders the top header with the task badge (`🚀 X Tasks found`), `+ Add Task` button, and `Clear All` button.
- **`components/Tasks/TaskList.jsx`**: Manages search, filter tabs (All / Active / Completed), loading/error states, and renders `<TaskCard />`s.
- **`components/Tasks/TaskCard.jsx`**: Single task item that supports completion cut-mark toggling, editing, and deleting.
- **`components/Tasks/TaskModal.jsx`**: Modal popup for adding a new task or editing an existing one with character limits.
- **`App.jsx`**: Stays super clean. It manages the main data state and imports only 3 components:
  ```jsx
  import Navbar from './components/Navbar/Navbar';
  import TaskList from './components/Tasks/TaskList';
  import TaskModal from './components/Tasks/TaskModal';
  ```

---

## 4. How to Run the Application

### 1. Start Spring Boot Backend
```powershell
.\mvnw.cmd spring-boot:run
```
*(Runs on `http://localhost:8080`)*

### 2. Start React Frontend
```powershell
cd frontend
npm run dev
```
*(Runs on `http://localhost:5173`)*
