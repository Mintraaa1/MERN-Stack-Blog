import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />

      {/* พื้นที่แสดง page */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
