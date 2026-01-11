import { type ReactNode, createContext, useState, useEffect } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import { loginInGoogle } from "../services/authGoogle";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  loginInWithGoogle: () => void;
  handleInfoUser: ({ email, name, uid }: UserProps) => void;
  user: UserProps | User | null;
};
export interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | User | null>(null);
  const [loadingAuth, setLoandingAuth] = useState(true);
  console.log(user);

  async function loginInWithGoogle() {
    try {
      const userData = await loginInGoogle();
      setUser(userData);
      console.log(userData);
    } catch (error) {
      console.log("Não foi possivel logar" + error);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
        setLoandingAuth(false);
      } else {
        setUser(null);
        setLoandingAuth(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  function handleInfoUser({ email, name, uid }: UserProps) {
    setUser({
      name,
      email,
      uid,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, // => !! transforma em um boolean
        loadingAuth,
        user,
        handleInfoUser,
        loginInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
