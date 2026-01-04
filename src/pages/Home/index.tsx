import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Container } from "../../components/Container";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export interface CarInfoProps {
  id: string;
  name: string;
  model: string;
  year: string;
  km: string;
  price: string | number;
  city: string;
  uid: string;
  description?: string;
  whatsapp?: string;
  owner?: string;
  images: ImagesCarProps[];
}

interface ImagesCarProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {
  const [carInfo, setCarInfo] = useState<CarInfoProps[]>([]);
  const [filterCar, setFilterCar] = useState("");
  useEffect(() => {
    loadCar();
  }, []);

  async function loadCar() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("createAt", "desc"));

    await getDocs(queryRef)
      .then((snapshot) => {
        const listcars = [] as CarInfoProps[];

        snapshot.forEach((doc) => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            city: doc.data().city,
            km: doc.data().km,
            model: doc.data().model,
            price: doc.data().price,
            uid: doc.data().uid,
            images: doc.data().images,
          });
        });

        setCarInfo(listcars);
      })
      .catch((err) => {
        console.log("Erro e caregar" + err);
      });
  }

  async function handledSearchCar() {
    if (filterCar === "") {
      loadCar();
      return;
    }

    setCarInfo([]);

    const searchRef = query(
      collection(db, "cars"),
      where("name", ">=", filterCar.toUpperCase()),
      where("name", "<=", filterCar.toUpperCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(searchRef);

    const listcars = [] as CarInfoProps[];

    querySnapshot.forEach((doc) => {
      listcars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        city: doc.data().city,
        km: doc.data().km,
        model: doc.data().model,
        price: doc.data().price,
        uid: doc.data().uid,
        images: doc.data().images,
      });
    });

    setCarInfo(listcars);
  }

  return (
    <div>
      <Container>
        <section className="w-full mt-15 ">
          <div
            className="mx-auto w-[80%] flex drop-shadow shadow p-1 
          rounded  bg-zinc-800/80"
          >
            <input
              type="text"
              placeholder="Digite nome do carro ou modelo..."
              className="w-full outline-none px-2"
              value={filterCar}
              onChange={(e) => setFilterCar(e.target.value)}
            />
            <Button variant="default" onClick={() => handledSearchCar()}>
              Buscar
            </Button>
          </div>
        </section>
        <h1 className="text-2xl my-5 font-bold text-center">
          Carros novos e usados em todo o Brasil
        </h1>
        <main className="mt-7">
          <section className="grid gap-4 grid-cols-2 sm:grid-cols-2  md:grid-cols-3  ">
            {carInfo &&
              carInfo.map((car) => (
                <Link to={`/detalhes/${car.id}`} key={car.id}>
                  <Card info={car} />
                </Link>
              ))}
          </section>
        </main>
      </Container>
    </div>
  );
}
