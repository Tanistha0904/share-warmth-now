import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");

  const handleSignup = async () => {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>

      <input
        className="border p-2 m-2 w-64"
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />

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

      <select
        className="border p-2 m-2 w-64"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="donor">Donor</option>
        <option value="rider">Rider</option>
      </select>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}
