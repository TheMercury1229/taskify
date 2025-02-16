import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
});

// Define status ENUM
export const taskStatusEnum = pgEnum("task_status", [
  "pending",
  "in-progress",
  "completed",
]);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  priority: integer("priority").default(1), // 1 = Low, 2 = Medium, 3 = High
  completed: boolean("completed").default(false),
  status: taskStatusEnum("status").default("pending"), // New field
  projectId: integer("project_id")
    .references(() => projects.id)
    .default(0),
  categoryId: integer("category_id")
    .references(() => categories.id)
    .default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
});
