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
              <div className="relative">
                <button
                  className="absolute z-20 top-3 right-3  md:text-3xl bg-zinc-300 text-zinc-800 hover:text-zinc-300
                    hover:bg-red-700 transition-all duration-300 rounded-full p-3 shadow"
                  onClick={() => handledDelete(car)}
                >
                  <BsTrashFill />
                </button>

                <Card info={car} key={car.id} />
              </div>
            ))}
        </main>
      </section>
    </Container>
  );
}
