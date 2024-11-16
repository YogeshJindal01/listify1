import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const MainPage = ({ username, password }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [description, setDescription] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const authHeader = {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  };

  // Fetch to-dos on initial load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/todos/${username}`,
          authHeader
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [username, password]);

  // Add a new to-do
  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/todos/${username}`,
        {
          title: newTodo,
          description,
          completed: false,
          date: new Date(),
        },
        authHeader
      );

      setTodos([...todos, response.data]);
      setNewTodo("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Toggle completed status of a to-do
  const handleToggleCompleted = async (todo) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/todos/${username}/${todo.id}`,
        { ...todo, completed: !todo.completed },
        authHeader
      );

      setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
    } catch (error) {
      console.error("Error toggling completed status:", error);
    }
  };

  // Delete a to-do
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/todos/${username}/${id}`,
        authHeader
      );
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Open edit form with the selected to-do
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // Save edits to the to-do
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/todos/${username}/${editTodo.id}`,
        { ...editTodo, title: editTitle, description: editDescription },
        authHeader
      );

      setTodos(todos.map((todo) => (todo.id === editTodo.id ? response.data : todo)));
      setEditTodo(null);
      setEditTitle("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 p-8">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          Your Daily List
        </h2>

        {/* Form to add new to-do */}
        <form
          onSubmit={handleAddTodo}
          className="flex flex-col items-center space-y-4 mb-8"
        >
          <input
            type="text"
            placeholder="New to-do title"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            required
            className="w-full max-w-md p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300 placeholder-gray-500 transition duration-300"
          />
          <textarea
            // type="textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-md p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300 placeholder-gray-500 transition duration-300"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          >
            Add To-Do
          </button>
        </form>

        {/* Display list of to-dos as cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
            >
              {/* <h3 className="text-lg font-bold text-purple-500 mb-2">Title:</h3> */}
              <h3 className="text-lg font-bold text-purple-500 mb-2">{todo.title}</h3>

              <p className="text-sm text-gray-300">{todo.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(todo.date).toLocaleDateString()}
              </p>
              <p
                className={`mt-2 font-semibold ${
                  todo.completed ? "text-green-500" : "text-red-500"
                }`}
              >
                {todo.completed ? "Completed" : "Incomplete"}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditTodo(todo)}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleToggleCompleted(todo)}
                  className={`px-4 py-1 rounded ${
                    todo.completed
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  } text-white transition duration-300`}
                >
                  {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit to-do form */}
        {editTodo && (
          <form
            onSubmit={handleSaveEdit}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          >
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl text-gray-100 w-full max-w-lg">
              <h3 className="text-2xl font-bold mb-4">Edit To-Do</h3>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditTodo(null);
                    setEditTitle("");
                    setEditDescription("");
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MainPage;
