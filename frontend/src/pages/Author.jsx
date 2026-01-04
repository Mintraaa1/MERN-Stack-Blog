import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Author() {
  const { id } = useParams(); // authorId
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const res = await api.get(`/post/author/${id}`);
        setPosts(res.data);
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.message || "Cannot fetch author posts",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorPosts();
  }, [id]);

  return (
    <>
      <Navbar variant="guest" />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mt-6">
          <h1 className="text-2xl font-bold mb-6">Author Posts</h1>

          {loading && <p>Loading...</p>}

          {!loading && posts.length === 0 && (
            <p className="text-gray-500">This author has no posts.</p>
          )}

          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h2 className="text-lg font-bold">{post.title}</h2>
                  <p className="text-sm text-gray-600">
                    by {post.author?.username}
                  </p>
                  <p className="text-sm text-gray-600">{post.sumary}</p>
                </div>

                <button
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
