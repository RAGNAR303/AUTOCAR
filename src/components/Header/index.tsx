import { HiOutlineLogin } from "react-icons/hi";
import { Link } from "react-router-dom";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Header() {
  const { signed, loadingAuth, user } = useContext(AuthContext);

  return (
    <header className="flex justify-center items-center drop-shadow shadow-xl w-full ">
      <nav
        className="flex items-center justify-between w-full max-w-6xl px-6 py-2
      "
      >
        <Link
          to={"/"}
          className="bg-red-700 font-bold px-3 py-1 
          rounded  uppercase text-2xl"
        >
          Auto<span className="text-zinc-800">Car</span>
        </Link>
        <Link
          to={!loadingAuth && signed ? "/painel" : "/login"}
          className="text-4xl flex items-center gap-2"
        >
          {user && user.name && <span className="text-sm capitalize">{user.name}</span>}
          {!loadingAuth && signed ? <HiMiniUserCircle /> : <HiOutlineLogin />}
        </Link>
      </nav>
    </header>
  );
}
