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

  // 1. ดึงข้อมูลโพสต์เฉพาะของผู้ใช้ที่ Login อยู่
  useEffect(() => {
    if (!user?.id) return;
    api.get(`/post/author/${user.id}`)
      .then((res) => setPosts(res.data))
      .catch(() => Swal.fire("Error", "ไม่สามารถดึงข้อมูลโพสต์ได้", "error"));
  }, [user]);

  // 2. ฟังก์ชันลบโพสต์
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // สำคัญ! ป้องกันไม่ให้คลิกแล้วเด้งไปหน้าเนื้อหา
    const result = await Swal.fire({
      title: 'ยืนยันการลบ?',
      text: "ข้อมูลจะถูกลบออกจากระบบถาวร",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444', // สีแดง (สีที่ 4 ใน Palette)
      cancelButtonColor: '#64748B', // สี Slate
      confirmButtonText: 'ลบโพสต์',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/post/${id}`); // ส่งคำขอลบไปยัง Backend
        setPosts(prev => prev.filter(p => p._id !== id)); // อัปเดต UI ทันที
        Swal.fire('ลบสำเร็จ!', 'โพสต์ถูกลบเรียบร้อยแล้ว', 'success');
      } catch (err) {
        Swal.fire('Error', 'ไม่สามารถลบได้ กรุณาลองใหม่', 'error');
      }
    }
  };

  return (
    <>
      <Navbar />
      {/* สีพื้นหลังหน้าเว็บ: Slate-50 (สีที่ 2) */}
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-slate-800">รายการโพสต์ของฉัน</h1>
          
          {posts.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <p className="text-slate-400">คุณยังไม่มีโพสต์ในรายการ</p>
            </div>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <div 
                key={post._id} 
                onClick={() => navigate(`/post/${post._id}`)} 
                /* การตกแต่ง Hover: เปลี่ยนสีขอบเป็น Indigo-500 (สีที่ 3) และยกตัวขึ้น */
                className="group bg-white rounded-2xl border-2 border-transparent hover:border-indigo-500 shadow-sm hover:shadow-xl p-5 flex items-center transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative"
              >
                {/* 3. แสดงรูปภาพจากโฟลเดอร์ uploads */}
                <img
                  src={post.cover?.startsWith('http') ? post.cover : `http://localhost:5000/${post.cover}`}
                  alt={post.title}
                  className="w-32 h-24 md:w-44 md:h-32 object-cover rounded-xl shadow-md"
                  onError={(e) => e.target.src = "/MERN1.png"}
                />
                
                <div className="ml-6 flex-1 pr-16">
                  <h2 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                    {new Date(post.createdAt).toLocaleDateString('th-TH')}
                  </p>
                  <p className="text-slate-500 text-sm mt-3 line-clamp-2">
                    {post.summary}
                  </p>
                </div>

                {/* 4. ไอคอนถังขยะ: จะแสดงเมื่อ Hover ที่การ์ด (group-hover:opacity-100) */}
                <button 
                  onClick={(e) => handleDelete(e, post._id)}
                  className="absolute right-6 p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
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