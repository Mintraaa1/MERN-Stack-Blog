import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";
import TokenService from "../services/token.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CreatePost() {
  const navigate = useNavigate();
  const user = TokenService.getUser();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.title || !form.summary || !form.content) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/post", form);

      Swal.fire("Success", "Post created", "success").then(() => {
        navigate(`/post/${res.data._id}`);
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Create post failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar variant="owner" username={user?.username} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create New Post
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border px-3 py-2 rounded"
            />

            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Summary"
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              name="content"
              rows={8}
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className="w-full border px-3 py-2 rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
