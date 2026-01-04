export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">SE NPRU Blog</h1>

      <div className="space-x-4">
        <a href="/login" className="hover:text-gray-300">
          Login
        </a>
        <a href="/register" className="hover:text-gray-300">
          Register
        </a>
      </div>
    </nav>
  );
}
