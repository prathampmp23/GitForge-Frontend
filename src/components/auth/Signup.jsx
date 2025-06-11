import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Box, Button, Heading, Text } from "@primer/react";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";
import "./auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (email && password && username) {
        setLoading(true);
        const res = await axios.post(
          "https://gitforge-backend.onrender.com/signup",
          {
            email,
            password,
            username,
          }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        setCurrentUser(res.data.userId);
        setLoading(false);
        window.location.href = "/";
      } else {
        alert("Enter Signup Details!");
      }
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid",
            borderColor: "border.default",
          }}
        >
          <Heading as="h2" sx={{ fontSize: 4 }}>
            Sign Up
          </Heading>
        </Box>

        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleSignup}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </div>

        <div className="pass-box">
          <Text as="p">
            Already have an account? <Link to="/auth">Login</Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
