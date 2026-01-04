import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthService from "../services/authentication.service";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!user.username || !user.password) {
      Swal.fire("Error", "Username or Password cannot be empty!", "error");
      return;
    }

    setLoading(true);

    const response = await AuthService.login(
      user.username,
      user.password
    );

    if (response.status === 200) {
      // ✅ set context ให้ตรงกับที่อาจารย์ใช้
      setUserInfo({
        id: response.data.id,
        username: response.data.username,
        accessToken: response.data.token,
      });

      Swal.fire("Success", "Login successful", "success").then(() => {
        navigate("/post/2"); 
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-md px-8 py-10 w-full max-w-sm">
            <h1 className="text-xl font-bold text-center mb-6">Login</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-2 text-white font-medium py-2 rounded-md text-sm ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
