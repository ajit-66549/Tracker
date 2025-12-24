import { useState } from "react";
import api from "../api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();    // stops page reload
    setMessage("");

    try {
      const res = await api.post("auth/login/", { username, password });
      if (res.data?.login === true || res.data?.Login === true) {
        setMessage("✅ Logged in!");
        onLogin();
      } else {
        setMessage("❌ Login failed");
      }
    } catch(err) {
      setMessage("❌ Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-label">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button">Login</button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
