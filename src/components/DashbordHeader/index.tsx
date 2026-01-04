import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { toast } from "react-hot-toast";
export function DashbordHeader() {
  async function handleSignout() {
    await signOut(auth);
    toast.success("USUARIO DESLOGADO COM SUCESSO");
  }

  return (
    <header
      className="bg-red-700 w-full rounded font-bold flex justify-between
     gap-3 px-4 py-2 text-zinc-400 "
    >
      <Link to={"/painel"} className="hover:text-white">
        Painel
      </Link>
      <Link to={"/painel/novo"} className="hover:text-white">
        Novo carro
      </Link>

      <button onClick={handleSignout} className="hover:text-white ml-auto">
        Sair da conta
      </button>
    </header>
  );
}
