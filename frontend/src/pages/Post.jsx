import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import TokenService from "../services/token.service";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Post = ({ title, author, summary, cover, createdAt, _id, index = 0 }) => {
  const isEven = index % 2 === 0;
  return (
    <div
      className={`flex flex-col md:flex-row items-center p-4 mb-6 rounded-xl shadow-md ${
        isEven ? "bg-white" : "bg-gray-100"
      }`}
    >
      <img
        src={cover}
        alt={title}
        className="w-full md:w-48 h-32 object-cover rounded mb-4 md:mb-0 md:mr-4"
      />
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">
          by {author?.username || "Unknown Author"}
        </p>
        <p className="mt-2 text-gray-700">{summary}</p>
      </div>
    </div>
  );
};

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = TokenService.getUser();

  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/post/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) return null;

  const isOwner = user?.id === post.author._id;

  return (
    <>
      <Navbar variant={user ? "owner" : "guest"} username={user?.username} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-6">
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            by {post.author.username}
          </p>

          {isOwner && (
            <button
              onClick={() => navigate(`/edit/${post._id}`)}
              className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Edit Post
            </button>
          )}

          <p className="whitespace-pre-line">{post.content}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Post;