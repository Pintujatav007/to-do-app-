import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  // Save tasks in localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTask("");
  };

  // Complete task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Delete one task
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Delete all tasks
  const deleteAll = () => {
    if (tasks.length === 0) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {
      setTasks([]);
    }
  };

  // Clear completed
  const clearCompleted = () => {
    setTasks((prev) =>
      prev.filter((item) => !item.completed)
    );
  };

  // Filter
  const filteredTasks = tasks.filter((item) => {
    if (filter === "active") {
      return !item.completed;
    }

    if (filter === "completed") {
      return item.completed;
    }

    return true;
  });

  const activeTasks = tasks.filter(
    (item) => !item.completed
  ).length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="app">

      <div className="todo-card">

        {/* Header */}
        <div className="header">

          <div>
            <div className="logo">
              <span>✓</span>
              TaskFlow
            </div>

            <h1>
              Get things <span>done.</span>
            </h1>

            <p>
              Organize your tasks and make your day productive.
            </p>
          </div>

          <div className="stats">
            <strong>{activeTasks}</strong>
            <small>Remaining</small>
          </div>

        </div>


        {/* Add Task */}
        <div className="add-section">

          <div className="input-wrapper">
            <span className="input-icon">✦</span>

            <input
              type="text"
              placeholder="Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
          </div>

          <button
            className="add-btn"
            onClick={addTask}
          >
            <span>+</span>
            Add Task
          </button>

        </div>


        {/* Toolbar */}
        <div className="toolbar">

          <div className="filters">

            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
              <b>{tasks.length}</b>
            </button>

            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
              <b>{activeTasks}</b>
            </button>

            <button
              className={
                filter === "completed" ? "active" : ""
              }
              onClick={() => setFilter("completed")}
            >
              Completed
              <b>{completedTasks}</b>
            </button>

          </div>

          <div className="actions">

            {completedTasks > 0 && (
              <button
                className="clear-btn"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}

            <button
              className="delete-all"
              onClick={deleteAll}
              disabled={tasks.length === 0}
            >
              🗑 Delete All
            </button>

          </div>

        </div>


        {/* Tasks */}
        <div className="task-list">

          {filteredTasks.length === 0 ? (

            <div className="empty">

              <div className="empty-circle">
                ✓
              </div>

              <h2>
                {filter === "all"
                  ? "No tasks yet"
                  : filter === "active"
                  ? "You're all caught up!"
                  : "No completed tasks"}
              </h2>

              <p>
                {filter === "all"
                  ? "Add your first task above to get started."
                  : "Nothing to show here right now."}
              </p>

            </div>

          ) : (

            filteredTasks.map((item) => (

              <div
                className={`task-item ${
                  item.completed ? "completed" : ""
                }`}
                key={item.id}
              >

                <button
                  className="check-btn"
                  onClick={() => toggleTask(item.id)}
                >
                  {item.completed ? "✓" : ""}
                </button>

                <span
                  className="task-text"
                  onClick={() => toggleTask(item.id)}
                >
                  {item.text}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  🗑
                </button>

              </div>

            ))

          )}

        </div>


        {/* Footer */}
        <div className="footer">

          <span>
            {activeTasks} {activeTasks === 1 ? "task" : "tasks"} remaining
          </span>

          <span>
            {completedTasks} completed
          </span>

        </div>

      </div>

    </div>
  );
}

export default App;