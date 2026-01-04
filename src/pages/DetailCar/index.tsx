import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import type { CarInfoProps } from "../Home";
import { Label } from "../../components/Label";
import { Button } from "../../components/Button";
import { FaWhatsapp } from "react-icons/fa";
import { CustonCorousel } from "../../components/Corousel";

export function DetailCar() {
  const { id } = useParams();

  const [carDetail, setCarDetail] = useState<CarInfoProps>();
  const navigate = useNavigate();
  useEffect(() => {
    function loadCarDetail() {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/");
        }
        setCarDetail({
          name: snapshot.data()?.name,
          city: snapshot.data()?.city,
          id: snapshot.data()?.id,
          km: snapshot.data()?.km,
          model: snapshot.data()?.model,
          price: snapshot.data()?.price,
          description: snapshot.data()?.description,
          year: snapshot.data()?.year,
          images: snapshot.data()?.images,
          uid: snapshot.data()?.uid,
          owner: snapshot.data()?.owner,
          whatsapp: snapshot.data()?.whatsapp,
        });
      });
    }
    loadCarDetail();
  }, [id, navigate]);

  console.log(carDetail);

  return (
    <Container>
      {carDetail && (
        <div className="w-full">
          <CustonCorousel>
            {carDetail.images.map((imagen) => (
              <img
                src={imagen.url}
                className="h-62 w-full  object-cover "
                key={imagen.name}
              />
            ))}
          </CustonCorousel>
          <main
            className=" mx-auto w-full flex flex-col drop-shadow shadow  
          rounded  bg-zinc-800/80 gap-3 p-4 box text-center md:text-justify "
          >
            <div className="flex pb-2.5 flex-col md:flex-row md:justify-between border-b-2 border-zinc-500">
              <h1 className="font-extrabold text-2xl md:text-4xl">
                {carDetail.name}
              </h1>
              <strong className="font-extrabold text-2xl md:text-4xl">
                R$ {carDetail.price}
              </strong>
            </div>
            <p className="text-zinc-300 md:text-2xl ">{carDetail.model}</p>
            <section className="flex justify-around flex-wrap p-5">
              <div>
                <Label>Cidade</Label>
                <p className="text-zinc-400 ">{carDetail.city}</p>
              </div>
              <div>
                <Label>Ano</Label>
                <p className="text-zinc-400 ">{carDetail.year}</p>
              </div>
              <div>
                <Label>Câmbio</Label>
                <p className="text-zinc-400 ">Automático</p>
              </div>
            </section>
            <div>
              <Label>Descrição</Label>
              <p className="text-zinc-400 ">{carDetail.description}</p>
            </div>
            <div>
              <Label>WhatsApp</Label>
              <p className="text-zinc-400 ">{carDetail.whatsapp}</p>
            </div>
            <a
              href={`https://api.whatsapp.com/send?phone=${carDetail.whatsapp}&text=Olá senhor ${carDetail.owner}, 
            vi ${carDetail.name} no site AutoCar e fiquei interessado`}
              target="_blank"
            >
              <Button className="w-full" variant="whatsapp">
                Enviar mensagem whatsappp <FaWhatsapp />
              </Button>
            </a>
          </main>
        </div>
      )}
    </Container>
  );
}
