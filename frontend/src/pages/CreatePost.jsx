import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// การตั้งค่าแถบเครื่องมือ (Toolbar) ของ Quill
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // การส่งไฟล์ต้องใช้ FormData
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]); // ส่งไฟล์รูปภาพ

    try {
      setLoading(true);
      await api.post("/post", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", "สร้างโพสต์เรียบร้อยแล้ว", "success").then(() => {
        navigate("/my-posts");
      });
    } catch (err) {
      Swal.fire("Error", "ไม่สามารถสร้างโพสต์ได้", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar variant="owner" />
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-10">
          <h1 className="text-2xl font-bold text-center mb-8">Create New Post</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" placeholder="หัวข้อ" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Summary</label>
              <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full border p-2 rounded" placeholder="คำอธิบายสั้นๆ" />
            </div>

            <div>
              <label className="block font-semibold mb-1">Content</label>
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules} 
                className="bg-white h-64 mb-12" // เว้นที่ให้ Editor
              />
            </div>

            <div className="pt-4">
              <label className="block font-semibold mb-1">Upload Image</label>
              <input type="file" onChange={(e) => setFiles(e.target.files)} className="w-full border p-2 rounded bg-gray-50" />
            </div>

            <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              {loading ? "กำลังสร้าง..." : "Create Post"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}