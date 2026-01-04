import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/Container";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O Campo emial é obrigatório"),
  password: z.string().nonempty("O campo senha e obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleSignOut() {
      await signOut(auth);
    }
    handleSignOut();
  }, []);

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        toast.success("LOGADO COM SUCESSO");
        console.log(user);
        navigate("/painel", { replace: true });
      })
      .catch((error) => {
        toast.error("VERIFIQUE OS DADOS E TENTE NOVAMANTE");
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
          className="flex flex-col items-center gap-7 w-full"
        >
          <h2 className="text-4xl font-bold">Login</h2>

          <Input
            type="email"
            placeholder="Digite seu email..."
            name="email"
            error={errors.email?.message}
            register={register}
            autoComplete="on"
          />

          <Input
            type="password"
            placeholder="Digite sua senha..."
            name="password"
            error={errors.password?.message}
            register={register}
          />

          <Button type="submit" variant="default" className="w-full shadow">
            Acessar
          </Button>
        </form>

        <p>
          Ainda não possui uma conta?{" "}
          <Link to={"/cadastro"} className="hover:underline">
            Cadastre-se{" "}
          </Link>
        </p>
      </div>
    </Container>
  );
}
