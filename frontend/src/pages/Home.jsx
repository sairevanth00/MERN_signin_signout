import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updatePassword } from "../api/authApi";

const Home = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getUser(token);
        setUser(res.data);
      } catch {
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      return alert("Please fill in both fields");
    }
    try {
      const token = localStorage.getItem("token");
      await updatePassword({ oldPassword, newPassword }, token);
      alert("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.log("err: ", err);
      alert(err.response.data.message || "Failed to update password");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const result = window.confirm("Are you sure you want to logout?");
    if (result) {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstName}</h1>
      <p>Email: {user?.email}</p>
      <p>Mobile: {user?.mobile}</p>
      <form className="flex flex-col space-y-2" onSubmit={handlePasswordUpdate}>
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer rounded-full">
          Update Password
        </button>
        <button
          className="text-red-500 mt-4 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
};
export default Home;
