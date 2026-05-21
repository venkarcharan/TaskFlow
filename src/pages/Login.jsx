import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

import {
  validateLogin,
} from "../utils/validation";

import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const { setUser } =
    useContext(UserContext);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value.replace(/^\s+/, ""),
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    const error =
      validateLogin(trimmedData);

    if (error) {

      alert(error);

      return;
    }

    setUser(trimmedData);

    navigate("/home");
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="logo-icon">
          ⬡
        </div>

        <h1>
          TaskFlow
        </h1>

        <p>
          Sign in to manage your tasks
        </p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
        >

          <label>
            FULL NAME
          </label>

          <input
            type="text"
            name="name"
            placeholder="e.g. Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
          />

          <label>
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />

          <label>
            PASSWORD
          </label>

          <input
            type="password"
            name="password"
            placeholder="Min 6 chars"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <button type="submit">
            Sign In →
          </button>

        </form>

        <p className="footer-text">
          Password must be 6+ characters
          with an uppercase letter and
          a number.
        </p>

      </div>

    </div>
  );
}

export default Login;