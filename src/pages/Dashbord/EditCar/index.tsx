import { Container } from "../../../components/Container";
import { DashbordHeader } from "../../../components/DashbordHeader";
import { Input } from "../../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../../../components/Label";
import { Button } from "../../../components/Button";
import { HiOutlineUpload } from "react-icons/hi";
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";
import { storage, db } from "../../../services/firebaseConnection";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";
import type { CarInfoProps } from "../../Home";

const schema = z.object({
  name: z.string().nonempty("O nome e obrigatório"),
  model: z.string().nonempty("Coloque modelo veículo"),
  year: z.string().nonempty("Coloque o ano do veículo"),
  km: z.string().nonempty("Coloque a quilomentragem"),
  price: z.string().nonempty("Coloque o preço"),
  city: z.string().nonempty("Coloque cidade e estado"),
  whatsapp: z
    .string()
    .min(1, "Campo whatsapp obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Numero de telefone inválido.",
    }),
  description: z
    .string()
    .min(10, "Descrição muito curta o minimo aceito 30 caracteres")
    .nonempty("Coloque a descrição veículo"),
});

type FormRegister = z.infer<typeof schema>;

interface ImagesUrlProps {
  name: string;
  uid: string;
  previewUrl: string;
  url: string;
}

export function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormRegister>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [carImage, setCarImage] = useState<ImagesUrlProps[]>([]);
  const [carEdit, setCarEdit] = useState<CarInfoProps>();

  useEffect(() => {
    function loadInfoCar() {
      if (!id) {
        return;
      }

      const carRef = doc(db, "cars", id);
      getDoc(carRef)
        .then((snapshot) => {
          console.log(snapshot.data());

          if (!snapshot.data()) {
            navigate("/");
            return;
          }
          setCarEdit({
            name: snapshot.data()?.name,
            model: snapshot.data()?.model,
            city: snapshot.data()?.city,
            km: snapshot.data()?.km,
            price: snapshot.data()?.price,
            year: snapshot.data()?.year,
            id: snapshot.data()?.id,
            uid: snapshot.data()?.uid,
            whatsapp: snapshot.data()?.whatsapp,
            description: snapshot.data()?.description,
            images: snapshot.data()?.images,
            owner: snapshot.data()?.owner,
          });
         
          
        })
        .catch((err) => {
          console.log("NÃO FOI POSSIVEL TRAZER INFORMAÇOES DO VEICULO" + err);
        });
    }
    loadInfoCar();
  }, [id, navigate]);

  function onRegister(data: FormRegister) {
    if (carImage.length === 0) {
      alert("Adicione imagen para continuar");
      return;
    }

    const imagesCarFilter = carImage.map((car) => {
      return {
        name: car.name,
        uid: car.uid,
        url: car.url,
      };
    });

    updateDoc((db, "cars", id), {
      name: data.name.toUpperCase(),
      model: data.model,
      year: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      whatsapp: data.whatsapp,
      description: data.description,
      createAt: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: imagesCarFilter,
    })
      .then(() => {
        reset();
        setCarImage([]);
        toast.success("VEICULO CADASTRADO COM SUCESSO");
      })
      .catch((err) => {
        toast.error("ERRO EM CADASTRAR O VEICULO" + err);
      });
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        alert("Envie uma imagem do tipo png ou jpeg!");
        return;
      }
    }
    console.log(e.target.files);
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUid = user.uid;
    const imageUid = uuidV4();

    const uploadRef = ref(storage, `image/${currentUid}/${imageUid}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imageItem = {
          name: imageUid,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        };

        setCarImage((images) => [...images, imageItem]);
      });
    });
  }

  async function handleDeleteImage(item: ImagesUrlProps) {
    const imagePath = `image/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImage(carImage.filter((car) => car.url !== item.url));
    } catch (err) {
      console.log("ERRO AO DELETAR" + err);
    }
  }

  return (
    <Container>
      <DashbordHeader />
      <div className="w-full">
        <div
          className="w-full flex drop-shadow shadow p-1 
rounded  bg-zinc-800/80 flex-col md:flex-row gap-2 "
        >
          <button className="relative border h-32 rounded w-full md:max-w-40 flex items-center justify-center mr-auto cursor-pointer hover:bg-zinc-700 duration-200">
            <div className="text-4xl cursor-pointer">
              <HiOutlineUpload className="cursor-pointer" />
            </div>
            <div className="absolute opacity-0 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="w-full h-20 cursor-pointer"
                onChange={handleFile}
              />
            </div>
          </button>

          {carImage.map((item) => (
            <div
              key={item.name}
              className="w-full h-32 flex items-center justify-center relative"
            >
              <button
                className="absolute top-3 right-3 text-3xl bg-zinc-300 text-zinc-800 hover:text-zinc-300
                    hover:bg-red-700 transition-all duration-300 rounded-full p-3"
                onClick={() => handleDeleteImage(item)}
              >
                <BsTrashFill />
              </button>
              <img
                src={item.previewUrl}
                alt="Foto do carro"
                className="rounded-lg w-full h-32 object-cover"
              />
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(onRegister)}
          className="flex flex-col w-full gap-3 mt-6"
        >
          <section className="flex flex-col md:flex-row w-full gap-5">
            <div className="w-full ">
              <Label htmlFor="name">Nome do carro</Label>
              <Input
                type="text"
                placeholder="ex. Mustang..."
                name="name"
                id="name"
                error={errors.name?.message}
                register={register}
                defaultValue={carEdit?.name}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="model">Modelo</Label>
              <Input
                type="text"
                placeholder="ex. DarkHorse 5.0..."
                name="model"
                id="model"
                error={errors.model?.message}
                register={register}
                defaultValue={carEdit?.model}
              />
            </div>
          </section>
          <section className="flex flex-col md:flex-row w-full gap-5">
            <div className="w-full">
              <Label htmlFor="year">Ano</Label>
              <Input
                type="text"
                placeholder="ex. 2024/2025"
                name="year"
                id="year"
                error={errors.year?.message}
                register={register}
                defaultValue={carEdit?.year}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="km">Km rodados</Label>
              <Input
                type="text"
                placeholder="ex. 26.000"
                name="km"
                id="km"
                error={errors.km?.message}
                register={register}
                defaultValue={carEdit?.km}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="price">Valor em R$</Label>
              <Input
                type="text"
                placeholder="ex. R$ 150,000"
                name="price"
                id="price"
                error={errors.price?.message}
                register={register}
                defaultValue={carEdit?.price}
              />
            </div>
          </section>
          <section className="flex flex-col md:flex-row w-full gap-5">
            <div className="w-full">
              <Label htmlFor="city">Cidade</Label>
              <Input
                type="text"
                placeholder="ex. São Paulo - SP"
                name="city"
                id="city"
                error={errors.city?.message}
                register={register}
                defaultValue={carEdit?.city}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                type="text"
                placeholder="ex. 11 912345678 "
                name="whatsapp"
                id="whatsapp"
                error={errors.whatsapp?.message}
                register={register}
                defaultValue={carEdit?.whatsapp}
              />
            </div>
          </section>

          <div className="relative flex flex-col">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              placeholder="Digite a descrição do carro...."
              {...register("description")}
              name="description"
              id="description"
              defaultValue={carEdit?.description}
              className="h-20 outline-none px-2 mx-auto w-full flex drop-shadow shadow p-1 
                  rounded  bg-zinc-800/80"
            ></textarea>
            {errors.description && (
              <span
                className="text-red-500 bg-red-200 text-[10px] 
      absolute px-1 rounded -bottom-5"
              >
                {errors.description?.message}
              </span>
            )}
          </div>
          <Button className="mt-5" variant="default">
            Cadastrar
          </Button>
        </form>
      </div>
    </Container>
  );
}
