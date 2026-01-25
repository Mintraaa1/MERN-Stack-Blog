import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext); // ข้อมูลผู้ใช้ที่ล็อกอินอยู่
  const { id } = useParams();
  const navigate = useNavigate();

  // ฟังก์ชันลบโพสต์
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: "โพสต์นี้จะถูกลบถาวร!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/v1/post/${id}`, {
          withCredentials: true, // เพื่อส่ง Token/Cookie ไปยัง Backend
        });
        if (response.status === 200) {
          await Swal.fire('ลบแล้ว!', 'โพสต์ของคุณหายไปแล้ว.', 'success');
          navigate('/'); // กลับหน้าแรก
        }
      } catch (error) {
        Swal.fire('Error!', error.response?.data?.message || 'ลบไม่สำเร็จ', 'error');
      }
    }
  };

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      
      {/* ตรวจสอบว่าเป็นเจ้าของโพสต์หรือไม่ ถ้าใช่ถึงจะโชว์ปุ่ม */}
      {userInfo?.id === postInfo.author?._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit Post</Link>
          {/* ปุ่มลบสำหรับผู้ใช้งานจริง */}
          <button className="delete-btn" onClick={handleDelete}>Delete Post</button> 
        </div>
      )}
      
      <div className="image">
        <img src={`http://localhost:5000/${postInfo.cover}`} alt=""/>
      </div>
      <div dangerouslySetInnerHTML={{__html: postInfo.content}} />
    </div>
  );
}