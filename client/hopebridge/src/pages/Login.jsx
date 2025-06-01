import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "donor",
  });
  const [error, setError] = useState("");
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id:
          "116025550167-7qc6i9qp772if499idhot9h384pfplad.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  const handleGoogleResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log("Google user info:", userObject);

    fetch("http://localhost:5000/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token && data.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          setError("");

          // 🔁 Redirecting properly (nri => donor)
          const role = data.user.role === "nri" ? "donor" : data.user.role;
          navigate(`/${role}`);
        } else {
          setError(data.message || "Google login failed");
        }
      })
      .catch(() => setError("Server error with Google login."));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role, // ✅ Correct role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setError("");

        // 🔁 Redirect properly (nri => donor)
        const role = data.user.role === "nri" ? "donor" : data.user.role;
        navigate(`/${role}`);
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-sky-50"
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10"
        >
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Welcome Back to HopeBridge
          </h2>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <div ref={googleButtonRef} className="flex justify-center mb-6" />

          <div className="flex items-center gap-2 mb-6">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <div className="flex flex-wrap gap-4">
                {["volunteer", "admin", "donor"].map((r) => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={form.role === r}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    <span className="capitalize text-gray-600">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Login
            </motion.button>

            <p className="text-center text-sm text-gray-500 mt-2">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
