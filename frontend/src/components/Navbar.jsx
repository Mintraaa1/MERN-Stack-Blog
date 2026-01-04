import { Link } from "react-router-dom";
import TokenService from "../services/token.service";

export default function Navbar() {
  const user = TokenService.getUser();

  return (
    <nav className="w-full bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        SE NPRU Blog
      </Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/create" className="hover:text-gray-300">
              Create new post
            </Link>

            <button
              onClick={() => {
                TokenService.removeuser();
                window.location.href = "/";
              }}
              className="hover:text-red-400"
            >
              Logout ({user.username})
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
