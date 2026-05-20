import { useContext, useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import { UserContext } from "../context/UserContext";

import "../styles/Home.css";

function Home() {

  const { user } = useContext(UserContext);

  const [tasks, setTasks] = useState([]);

  const [filteredTasks, setFilteredTasks] =
    useState([]);

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {

    const storedTasks =
      localStorage.getItem("tasks");

    if (storedTasks) {

      const parsedTasks =
        JSON.parse(storedTasks);

      setTasks(parsedTasks);

      setFilteredTasks(parsedTasks);

    } else {

      fetch(
        "https://jsonplaceholder.typicode.com/todos"
      )
        .then((res) => res.json())
        .then((data) => {

          const updatedTasks = data
            .slice(0, 8)
            .map((item) => ({
              id: item.id,
              task: item.title,
              status: item.completed
                ? "Completed"
                : "In Progress",
              assignedTo: "",
            }));

          setTasks(updatedTasks);

          setFilteredTasks(updatedTasks);

          localStorage.setItem(
            "tasks",
            JSON.stringify(updatedTasks)
          );
        });
    }

  }, []);

  const filterTasks = (
    status,
    search = searchTerm
  ) => {

    setActiveFilter(status);

    let updatedTasks = tasks;

    if (status !== "All") {

      updatedTasks = updatedTasks.filter(
        (task) =>
          task.status === status
      );
    }

    if (search.trim() !== "") {

      updatedTasks = updatedTasks.filter(
        (task) =>
          task.task
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          task.assignedTo
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    setFilteredTasks(updatedTasks);
  };

  const deleteTask = (id) => {

    const updated = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updated);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updated)
    );

    let filtered = updated;

    if (activeFilter !== "All") {

      filtered = filtered.filter(
        (task) =>
          task.status ===
          activeFilter
      );
    }

    if (searchTerm.trim() !== "") {

      filtered = filtered.filter(
        (task) =>
          task.task
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||

          task.assignedTo
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
    }

    setFilteredTasks(filtered);
  };

  const totalTasks = tasks.length;

  const inProgress = tasks.filter(
    (task) =>
      task.status ===
      "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) =>
      task.status ===
      "Completed"
  ).length;

  const hold = tasks.filter(
    (task) =>
      task.status === "Hold"
  ).length;

  return (

    <div className="home-page">

      <Navbar />

      <div className="welcome-banner">

        <h1>
          Welcome,
          <span>
            {" "}
            {user?.name}
          </span>
          👋
        </h1>

        <p>
          to Task Manager
        </p>

      </div>

      <div className="stats-container">

        <div className="stats-card">

          <h2>
            {totalTasks}
          </h2>

          <p>
            TOTAL TASKS
          </p>

        </div>

        <div className="stats-card progress">

          <h2>
            {inProgress}
          </h2>

          <p>
            IN PROGRESS
          </p>

        </div>

        <div className="stats-card completed">

          <h2>
            {completed}
          </h2>

          <p>
            COMPLETED
          </p>

        </div>

        <div className="stats-card hold">

          <h2>
            {hold}
          </h2>

          <p>
            ON HOLD
          </p>

        </div>

      </div>

      <div className="controls">

        <input
          type="text"
          placeholder="🔍 Search tasks or users..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => {

            setSearchTerm(
              e.target.value
            );

            filterTasks(
              activeFilter,
              e.target.value
            );
          }}
        />

        <div className="filter-buttons">

          <button
            className={
              activeFilter === "All"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks("All")
            }
          >
            All
          </button>

          <button
            className={
              activeFilter ===
              "In Progress"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks(
                "In Progress"
              )
            }
          >
            In Progress
          </button>

          <button
            className={
              activeFilter ===
              "Completed"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks(
                "Completed"
              )
            }
          >
            Completed
          </button>

          <button
            className={
              activeFilter === "Hold"
                ? "active-filter"
                : ""
            }
            onClick={() =>
              filterTasks("Hold")
            }
          >
            Hold
          </button>

        </div>

      </div>

      <div className="task-grid">

        {filteredTasks.map((task) => (

          <TaskCard
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            filteredTasks={
              filteredTasks
            }
            setFilteredTasks={
              setFilteredTasks
            }
            deleteTask={deleteTask}
          />

        ))}

      </div>

    </div>
  );
}

export default Home;