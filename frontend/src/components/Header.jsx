import { useContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { userInfo,setUserInfo } = useContext(UserContext);
  const username = userInfo?.username;s
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <a className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7"
                        />
                    </svg>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <a className="btn btn-ghost normal-case text-xl">My Blog</a>
            </div>
            <div className="navbar-end">
                {userInfo?.username ? (
                    <span className="mr-4">Hello, {userInfo.username}</span>
                ) : (
                    <a href="/login" className="btn">Login</a>
                )}
            </div>
            <div className="navbar-end space-x-2">
                <a className="btn" href="login">Login</a>
                <a className="btn" href="register">Register</a>
            </div>
        </div>
    );
}
export default Header;
    