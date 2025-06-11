import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Box, Button, Heading, Text } from "@primer/react";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";
import "./auth.css";

export default function Login() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (email && password) {
        setLoading(true);
        const res = await axios.post(
          "https://gitforge-backend.onrender.com/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        setCurrentUser(res.data.userId);
        setLoading(false);
        window.location.href = "/";
      } else{
      alert("Enter Email & Password!");
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
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
            Sign In
          </Heading>
        </Box>

        <div className="login-box">
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
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </div>

        <div className="pass-box">
          <Text as="p">
            New to GitHub? <Link to="/signup">Create an account</Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
