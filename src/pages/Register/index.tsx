import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { Container } from "../../components/Container";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const schema = z.object({
  name: z.string("O nome e obrigatório").nonempty("O nome e obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O Campo emial é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter 8 caracteres")
    .nonempty("O campo senha e obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const { handleInfoUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function handleSignOut() {
      await signOut(auth);
    }
    handleSignOut();
  }, []);

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });
        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid,
        });
        toast.success("USUARIO CADASTRADO COM SUCESSO");

        navigate("/painel", { replace: true });
      })
      .catch((error) => {
        toast.error("ERRO AO CADASTRAR ESTE USUARIO");

        console.log(error);
      });
  }

  return (
    <Container>
      <div className="flex h-screen flex-col gap-4 items-center justify-center w-full max-w-md">
        <Link
          to={"/"}
          className="bg-red-700 font-bold px-3 py-1 
          rounded  uppercase text-4xl"
        >
          Auto<span className="text-zinc-800">Car</span>
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-7  w-full"
        >
          <h2 className="text-4xl font-bold">Cadastro</h2>
          <Input
            type="text"
            placeholder="Digite seu nome completo..."
            name="name"
            error={errors.name?.message}
            register={register}
          />
          <Input
            type="email"
            placeholder="Digite seu email..."
            name="email"
            error={errors.email?.message}
            register={register}
          />

          <Input
            type="password"
            placeholder="Digite sua senha..."
            name="password"
            error={errors.password?.message}
            register={register}
          />

          <Button type="submit" variant="default" className="w-full shadow">
            Cadastrar
          </Button>
        </form>

        <p>
          Já possui uma conta?{" "}
          <Link to={"/login"} className="hover:underline">
            Faça login{" "}
          </Link>
        </p>
      </div>
    </Container>
  );
}
