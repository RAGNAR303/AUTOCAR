import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { DetailCar } from "./pages/DetailCar";
import { DashBord } from "./pages/Dashbord";
import { NewCar } from "./pages/Dashbord/NewCar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Private } from "./routes/private";
import { ErrorPages } from "./pages/ErroPages";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detalhes/:id",
        element: <DetailCar />,
      },
      {
        path: "/painel",
        element: (
          <Private>
            <DashBord />
          </Private>
        ),
      },
      {
        path: "/painel/novo",

        element: (
          <Private>
            <NewCar />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
  {
    path: "*",
    element: <ErrorPages />,
  },
]);

export { router };
