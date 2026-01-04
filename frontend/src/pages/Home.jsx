// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Post from "./Post";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
    }
    catch (err) {
      Swal.fire({
        title:"Home",
        text: err.response?.data?.message || "Cannot fetch posts",
        icon: "error",
      });
}
  };
  fetchAllPosts();
}, []);
  return (
    <>
      <Navbar
        variant={userInfo ? "owner" : "guest"}
        username={userInfo?.username}
      />
      <div className="min-h-screen p-6 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600">
        <h1 className="text-xl font-bold mb-4 text-white">Home Page</h1>
        <div
          onClick={() => navigate("/post/1")}
          className="bg-white rounded-xl shadow-md p-4 mb-6 flex space-x-4 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
        >
          <img
            src="/MERN1.png"
            alt="intel"
            className="w-48 h-32 object-cover rounded"
          />
          <div>
            <h2 className="text-lg font-bold">
              ซีอีโอรักษาการณ์ Intel บอกว่า
              ซีอีโอคนใหม่ต้องสร้างพื้นฐานในการขยายการผลิตปี
            </h2>
            <p className="text-sm text-gray-500">
              วันที่ | 05 December 2024 - 23:26
            </p>
            <p className="mt-2 text-gray-700">
              หลังประกาศลาออกโดยมีผลในเดือนพฤษภาคมนี้ Pat Gelsinger
              ภายหลังกลับมายืนที่...
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div
          onClick={() => navigate("/my-posts")}
          className="bg-white rounded-xl shadow-md p-4 flex space-x-4 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
        >
          <img
            src="/MERN2.png"
            alt="kbtg"
            className="w-48 h-32 object-cover rounded"
          />
          <div>
            <h2 className="text-lg font-bold">
              KBTG วางเป้าโคดีบ AgentiC AI ในปี 2025 ทำงานร่วมกับ AI แห่งอนาคต
            </h2>
            <p className="text-sm text-gray-500">
              วันที่ | 06 December 2024 - 21:11
            </p>
            <p className="mt-2 text-gray-700">
              นายธีรเดช เมธาวี กล่าวถึงเทคโนโลยีที่กำลังพลิกโฉมการพัฒนา...
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Home;
