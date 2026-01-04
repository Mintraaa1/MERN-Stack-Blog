import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import MyPosts from "../pages/MyPosts";
import Author from "../pages/Author";


export default function Router() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected (เดี๋ยวค่อยใส่ guard เพิ่ม) */}
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/my-posts" element={<MyPosts />} />
      <Route path="/author/:id" element={<Author />} />
    </Routes>
  );
}
