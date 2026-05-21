import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/AddTask.css";

function AddTask() {

  const navigate = useNavigate();

  const [taskData, setTaskData] =
    useState({
      task: "",
      status: "In Progress",
      assignedTo: "",
    });

  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !taskData.task.trim() ||
      !taskData.assignedTo.trim()
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    const oldTasks =
      JSON.parse(
        localStorage.getItem("tasks")
      ) || [];

    const newTask = {

      id:
        oldTasks.length > 0
          ? Math.max(
              ...oldTasks.map(
                (task) => task.id
              )
            ) + 1
          : 1,

      ...taskData,
    };

    const updatedTasks = [

      newTask,

      ...oldTasks,
    ];

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    alert(
      "Task Added Successfully"
    );

    navigate("/home");
  };

  return (

    <>
      <Navbar />

      <div className="add-task-page">

        <div className="add-task-container">

          <h1>
            Add New Task
          </h1>

          <p>
            Fill in the details to create a new task
          </p>

          <form onSubmit={handleSubmit}>

            <label>
              Task Name *
            </label>

            <input
              type="text"
              name="task"
              placeholder="Describe the task..."
              value={taskData.task}
              onChange={handleChange}
            />

            <label>
              Status *
            </label>

            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >

              <option>
                In Progress
              </option>

              <option>
                Completed
              </option>

              <option>
                Hold
              </option>

            </select>

            <label>
              Assign To *
            </label>

            <input
              type="text"
              name="assignedTo"
              placeholder="Enter team member name"
              value={
                taskData.assignedTo
              }
              onChange={handleChange}
            />

            <div className="task-id-box">

              Task ID will be:

              <span>
                {" "}
                #
                {
                  (() => {

                    const stored =
                      JSON.parse(
                        localStorage.getItem(
                          "tasks"
                        )
                      ) || [];

                    return stored.length > 0
                      ? Math.max(
                          ...stored.map(
                            (task) => task.id
                          )
                        ) + 1
                      : 1;

                  })()
                }
              </span>

            </div>

            <div className="button-group">

              <button
                type="submit"
                className="add-btn"
              >
                + Add Task
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  navigate("/home")
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddTask;