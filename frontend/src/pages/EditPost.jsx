import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";
import TokenService from "../services/token.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = TokenService.getUser();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    api.get(`/post/${id}`).then((res) => {
      if (res.data.author._id !== user?.id) {
        Swal.fire("Error", "Unauthorized", "error");
        navigate("/");
      } else {
        setForm({
          title: res.data.title,
          summary: res.data.summary,
          content: res.data.content,
        });
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/post/${id}`, form);
      Swal.fire("Success", "Post updated", "success").then(() => {
        navigate(`/post/${id}`);
      });
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Update failed",
        "error"
      );
    }
  };

  return (
    <>
      <Navbar variant="owner" username={user?.username} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-6">
          <h1 className="text-2xl font-bold text-center mb-6">Edit Post</h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              rows={8}
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <button className="w-full bg-indigo-600 text-white py-2 rounded">
              Update Post
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
