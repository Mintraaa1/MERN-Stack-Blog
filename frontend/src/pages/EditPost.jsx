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
    cover: "",
  });

  useEffect(() => {
    api.get(`/post/${id}`).then((res) => {
      // ตรวจสอบสิทธิ์เจ้าของโพสต์
      if (res.data.author?._id !== user?.id) {
        Swal.fire("Error", "คุณไม่มีสิทธิ์แก้ไขโพสต์นี้", "error");
        navigate("/");
      } else {
        setForm({
          title: res.data.title,
          summary: res.data.summary,
          content: res.data.content,
          cover: res.data.cover || "",
        });
      }
    });
  }, [id, user?.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/post/${id}`, form);
      Swal.fire("สำเร็จ", "อัปเดตข้อมูลเรียบร้อย", "success").then(() => {
        navigate(`/post/${id}`); // แก้ไขเสร็จกลับไปดูหน้าข่าวตัวเต็ม
      });
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <>
      <Navbar variant="owner" username={user?.username} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
          <button onClick={() => navigate(-1)} className="text-indigo-600 font-bold mb-4">← Cancel</button>
          <h1 className="text-2xl font-bold text-center mb-6">Edit Post</h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
            <input name="summary" value={form.summary} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
            <input name="cover" value={form.cover} onChange={handleChange} placeholder="Image URL" className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea rows={10} name="content" value={form.content} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold shadow-md">
              Update Post
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}