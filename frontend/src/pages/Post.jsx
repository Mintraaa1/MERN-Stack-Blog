import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import TokenService from "../services/token.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = TokenService.getUser();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/post/${id}`).then((res) => setPost(res.data)).catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="text-center mt-20 text-white">Loading...</div>;

  const isOwner = user?.id === post.author?._id;

  return (
    <>
      <Navbar variant={user ? "owner" : "guest"} username={user?.username} />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* ปุ่มย้อนกลับ */}
          <button 
            onClick={() => navigate(-1)} 
            className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 font-bold transition"
          >
            <span className="mr-2 text-xl">←</span> Back
          </button>

          <article className="bg-white rounded-2xl shadow-sm overflow-hidden p-6 md:p-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-500 text-sm border-b pb-6 mb-8">
              <span className="text-indigo-600 font-semibold">
                {new Date(post.createdAt).toLocaleDateString('th-TH', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
              <span className="mx-3 text-gray-300">|</span>
              <span>โดย <span className="text-gray-900 font-bold">{post.author?.username || "Admin"}</span></span>
              
              {isOwner && (
                <button onClick={() => navigate(`/edit/${post._id}`)} className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition">
                  Edit Post
                </button>
              )}
            </div>

            <img src={post.cover} alt="" className="w-full h-auto rounded-xl mb-10 shadow-sm" onError={(e) => e.target.src="/MERN1.png"} />

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPage;