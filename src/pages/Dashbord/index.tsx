import { Card } from "../../components/Card";
import { Container } from "../../components/Container";
import { DashbordHeader } from "../../components/DashbordHeader";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import type { CarInfoProps } from "../Home";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";

// import { deleteObject, ref } from "firebase/storage";

export function DashBord() {
  const [cars, setCars] = useState<CarInfoProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCars() {
      if (!user?.uid) {
        return;
      }

      const carRef = collection(db, "cars");
      const queryRef = query(carRef, where("uid", "==", user.uid));

      await getDocs(queryRef)
        .then((snapshot) => {
          const carList = [] as CarInfoProps[];

          snapshot.forEach((car) => {
            carList.push({
              id: car.id,
              name: car.data().name,
              model: car.data().model,
              km: car.data().km,
              price: car.data().price,
              city: car.data().city,
              year: car.data().year,
              images: car.data().images,
              uid: car.data().uid,
            });
          });

          setCars(carList);
        })
        .catch((err) => {
          console.log("NÃO FOI POSSSIVEL CARREGAR OS DADOS" + err);
        });
    }

    loadCars();
  }, [user]);

  async function handledDelete(item: CarInfoProps) {
    const docRef = doc(db, "cars", item.id);
    await deleteDoc(docRef);

    // Bloco e excluir do storage quando for ativado
    // item.images.map(async (image) => {
    //   const imagePath = `images/${image.uid}/${image.name}`;
    //   const imageRef = ref(storage, imagePath);

    //   try {
    //     await deleteObject(imageRef);
    //   } catch (error) {
    //     console.log(" ERROR AO EXCLUIR ESSA IMAGEM" + error);
    //   }
    // });

    setCars(cars.filter((car) => car.id !== item.id));
  }

  return (
    <Container>
      <DashbordHeader />

      <section className="w-full h-full">
        <main className="grid gap-2.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cars &&
            cars.map((car) => (
              <div className="relative" key={car.id}>
                <div className="absolute z-20 top-3 right-3 flex flex-col gap-1 ">
                  <button
                    className=" md:text-3xl bg-zinc-300 text-zinc-800 hover:text-zinc-300
                    hover:bg-red-700 transition-all duration-300 rounded-full p-2 shadow"
                    onClick={() => handledDelete(car)}
                  >
                    <BsTrashFill />
                  </button>
                  <Link to={`/painel/editar/${car.id}`}>
                    <button
                      className="  md:text-3xl bg-zinc-300 text-zinc-800 hover:text-zinc-300
                    hover:bg-blue-700 transition-all duration-300 rounded-full p-2 shadow"
                    >
                      <RiEdit2Fill />
                    </button>
                  </Link>
                </div>

                <Card info={car} />
              </div>
            ))}
        </main>
      </section>
    </Container>
  );
}
