import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login Successful!");

      if (data.role === "donor") navigate("/donate");
      if (data.role === "rider") navigate("/rider");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <input
        className="border p-2 m-2 w-64"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 m-2 w-64"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
