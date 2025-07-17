import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please fill in both fields");
    }
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      if(err?.response?.data?.message) {
        return alert(err?.response?.data?.message + `, only ${err?.response?.data?.attemptsLeft} attempts left`);
      } else {
        return alert(err?.response?.data || "Login failed");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="flex flex-col space-y-2" onSubmit={handleLogin}>
        <input
          className="border p-2 rounded"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer rounded-full">
          Login
        </button>
        <button
          className="text-red-600 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup")
          }}
        >
          Don't have an account? Click here to Signup.
        </button>
      </form>
    </div>
  );
};
export default Login;
