# Taskify

## 🚀 Introduction
Taskify is a full-featured **task management web application** designed to help individuals and teams organize their tasks efficiently. It includes features like **task tracking, project management, calendar view, priority sorting, and user authentication**.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Zustand, React Query, ShadCN
- **Backend:** Next.js API Routes, Drizzle ORM, PostgreSQL
- **Authentication:** JWT Authentication
- **State Management:** Zustand
- **Database:** PostgreSQL with Drizzle ORM

## ✨ Features
- ✅ **Task Management:** Create, update, delete, and filter tasks easily.
- ✅ **Project Organization:** Manage tasks under projects for better tracking.
- ✅ **Category-based Sorting:** Categorize tasks for better organization.
- ✅ **Calendar View:** Visualize tasks by due date in an interactive calendar.
- ✅ **Priority Sorting:** Set task priorities (High, Medium, Low).
- ✅ **User Authentication:** Secure login and registration using JWT.
- ✅ **Real-time Updates:** Uses React Query for seamless UI updates.

---

## 🎯 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/TheMercury1229/taskify.git
cd taskify
```

### **2️⃣ Install Dependencies**
```sh
npm install  # or yarn install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and configure:
```env
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### **4️⃣ Setup Database & Migrations**
```sh
npx drizzle-kit push
```

### **5️⃣ Run the Development Server**
```sh
npm run dev  # or yarn dev
```
The app will be available at **`http://localhost:3000`**.

---

## 🔧 API Routes
### **Auth Routes**
| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | User login          |

### **Tasks API**
| Method | Endpoint            | Description                    |
|--------|---------------------|--------------------------------|
| GET    | `/api/tasks`        | Fetch all tasks               |
| GET    | `/api/tasks/:id`    | Get a specific task            |
| POST   | `/api/tasks`        | Create a new task              |
| PATCH  | `/api/tasks/:id`    | Update a task                  |
| DELETE | `/api/tasks/:id`    | Delete a task                  |

### **Projects API**
| Method | Endpoint            | Description                    |
|--------|---------------------|--------------------------------|
| GET    | `/api/projects`     | Fetch all projects            |
| POST   | `/api/projects`     | Create a new project          |
| DELETE | `/api/projects/:id` | Delete a project & its tasks  |

---

## 🚀 Deployment
### **Deploy on Vercel**
```sh
npm run build
vercel deploy
```
Or use **Docker** for deployment.

---

## 🛠️ Future Enhancements
- 🔹 **Task Comments** – Add discussions to tasks.
- 🔹 **Recurring Tasks** – Automate repeating tasks.
- 🔹 **Team Collaboration** – Share tasks with team members.
- 🔹 **Drag & Drop** – Move tasks between statuses easily.

---

## 👨‍💻 Contributing
Contributions are welcome! Feel free to submit a **pull request**.

---


💡 **Taskify - Your Ultimate Task Management Solution!** 🎯

