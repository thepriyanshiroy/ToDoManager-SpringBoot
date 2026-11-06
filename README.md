# 🚀 ToDo Application — Full-Stack (Spring Boot + React + MySQL)

A modern full-stack To-Do application built with a **Spring Boot** REST API backend and a responsive **React (Vite)** frontend. It supports full task lifecycle management, keyword searching, completion toggling ("cut mark"), live count badges, and interactive OpenAPI documentation via **Scalar**.

---

## ✨ Features

- **Full Task CRUD:** Create, read, update, and delete tasks with real-time UI updates.
- **Completion "Cut Mark":** Toggle tasks as completed with a strike-through cut-mark and status pill badges.
- **Instant Search:** Case-insensitive search across task titles and descriptions.
- **Tab Filtering:** Filter tasks instantly between **All**, **Active**, and **Completed**.
- **Live Metric Badge:** Dynamic navbar badge (**🚀 X Tasks found**) powered by the backend count endpoint.
- **Input Validation:** Enforces non-empty titles (max 100 characters) with real-time character counters.
- **Interactive API Documentation:** Embedded **Scalar OpenAPI Reference** at `/scalar.html`.
- **Responsive Dark Theme:** Polished glassmorphism UI built with modern CSS custom properties and `lucide-react` icons.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 4.x / 3.x
- **Language / Runtime:** Java 25
- **ORM / Database:** Spring Data JPA, Hibernate, MySQL 8
- **Validation:** Jakarta Bean Validation (`spring-boot-starter-validation`)
- **API Docs:** Scalar OpenAPI (`springdoc-openapi-starter-webmvc-scalar`)
- **Testing:** JUnit 5, Spring Boot Test

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Icons:** `lucide-react`
- **Architecture:** Clean component-based hierarchy (`Navbar/`, `Tasks/`, `services/`)

---

## 📁 Project Structure

```text
toDo/
├── pom.xml                                     # Spring Boot Maven configuration
├── mvnw / mvnw.cmd                             # Maven wrapper executables
├── context.md                                  # Internal architecture reference
│
├── src/                                        # BACKEND (Spring Boot)
│   ├── main/
│   │   ├── java/List/toDo/
│   │   │   ├── config/
│   │   │   │   └── OpenApiConfig.java          # OpenAPI / Swagger configuration
│   │   │   ├── controller/
│   │   │   │   └── TaskController.java         # REST endpoints & validation
│   │   │   ├── model/
│   │   │   │   └── Task.java                   # JPA Entity (tasks table)
│   │   │   ├── repository/
│   │   │   │   └── TaskRepository.java         # Spring Data JPA queries
│   │   │   ├── service/
│   │   │   │   └── TaskService.java            # Business logic
│   │   │   └── ToDoApplication.java            # Main entry point
│   │   └── resources/
│   │       ├── application.properties          # Port, MySQL & JPA configuration
│   │       └── static/
│   │           └── scalar.html                 # Interactive Scalar documentation
│   └── test/
│       └── java/List/toDo/
│           └── ToDoApplicationTests.java       # Integration tests
│
└── frontend/                                   # FRONTEND (React + Vite)
    ├── package.json                            # Frontend dependencies & scripts
    ├── vite.config.js                          # Vite configuration & /api proxy
    └── src/
        ├── services/
        │   └── taskApi.js                      # Direct API calls
        ├── components/
        │   ├── Navbar/
        │   │   └── Navbar.jsx                  # Top header, badge & actions
        │   └── Tasks/
        │       ├── TaskList.jsx                # Search, filter tabs & task grid
        │       ├── TaskCard.jsx                # Single task card with cut mark
        │       └── TaskModal.jsx               # Add / Edit dialog modal
        ├── App.jsx                             # Main application orchestrator
        ├── App.css                             # Layout and component styles
        └── main.jsx                            # React entry point
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Java JDK 21+** (Java 25 recommended)
- **Node.js 18+** & **npm**
- **MySQL Server** (running locally on port `3306`)

---

### Step 1: Database Setup
1. Start your local MySQL service.
2. The application will automatically create the database `todo_db` and tables via Hibernate `update`.
3. If needed, update MySQL credentials in [`src/main/resources/application.properties`](file:///src/main/resources/application.properties):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/todo_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=root
   ```

---

### Step 2: Run the Backend
In the root directory, run:

**Windows (PowerShell / CMD):**
```powershell
.\mvnw.cmd spring-boot:run
```

**macOS / Linux:**
```bash
./mvnw spring-boot:run
```

The Spring Boot backend will start on **`http://localhost:8080`**.

---

### Step 3: Run the Frontend
Open a new terminal window, navigate to the `frontend` folder, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:5173`** in your browser to start using the application.

---

## 📡 REST API Reference

All endpoints are rooted at `/api/tasks`:

| Method | Endpoint | Query / Path Params | Request Body | Description |
|---|---|---|---|---|
| `GET` | `/api/tasks` | `search` *(optional)* | None | Fetch all tasks or filter by title/body |
| `GET` | `/api/tasks/{id}` | `id` *(Long)* | None | Fetch single task by ID |
| `POST` | `/api/tasks` | None | `{"title": "...", "body": "..."}` | Create a new task (title max 100) |
| `PUT` | `/api/tasks/{id}` | `id` *(Long)* | `{"title": "...", "body": "..."}` | Update task title and body |
| `PATCH`| `/api/tasks/{id}/toggle` | `id` *(Long)* | None | Toggle completion cut-mark |
| `DELETE`| `/api/tasks/{id}` | `id` *(Long)* | None | Delete a task by ID |
| `DELETE`| `/api/tasks` | None | None | Clear all tasks |
| `GET` | `/api/tasks/count` | None | None | Get total task count for badge |

---

## 📖 Interactive API Documentation

When the backend is running, you can explore and test the endpoints directly using the built-in **Scalar API Reference**:
- **Scalar UI:** `http://localhost:8080/scalar.html` or `http://localhost:8080/scalar`
- **OpenAPI JSON Spec:** `http://localhost:8080/v3/api-docs`

---

## 🧪 Testing

### Backend Unit & Integration Tests
Run tests with Maven:
```powershell
.\mvnw.cmd test
```

### Frontend Production Build Test
Verify the frontend build bundle:
```bash
cd frontend
npm run build
```

---

## 📝 Git Push Instructions

When you are ready to push this repository to GitHub:

```bash
git init
git add .
git commit -m "feat: initial commit of full-stack ToDo application"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```
*(The root `.gitignore` is already configured to exclude `target/`, `.mvn/`, and `frontend/node_modules/`).*
