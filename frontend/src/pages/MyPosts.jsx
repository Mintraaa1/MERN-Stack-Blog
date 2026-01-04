import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import TokenService from "../services/token.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function MyPosts() {
  const navigate = useNavigate();
  const user = TokenService.getUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    api
      .get(`/post/author/${user.id}`)
      .then((res) => setPosts(res.data))
      .catch(() => {
        Swal.fire("Error", "Cannot fetch posts", "error");
      });
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">My Posts</h1>

          {posts.length === 0 && (
            <p className="text-gray-500">You have no posts yet.</p>
          )}

          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
              className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-50"
            >
              <h2 className="font-bold">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
