import { FaMapMarkerAlt } from "react-icons/fa";
import type { CarInfoProps } from "../../pages/Home";
import { useState } from "react";

interface CardProps {
  info: CarInfoProps;
}

export function Card({ info }: CardProps) {
  const [loadImage, setLoadImage] = useState<string[]>([]);

  function handleImageLoad(id: string) {


    setLoadImage((previewImage) => [...previewImage, id]);
  }

  return (
    <article
      className="flex flex-col space-y-2 justify-around p-1 shadow-2xs drop-shadow-2xl h-full
             bg-zinc-800/80 rounded hover:scale-105 duration-300 transition-all box"
      id={info.id}
    >
      {loadImage ? (
        <img
          src={info.images[0].url}
          alt={info.name}
          className="max-h-60 object-cover rounded "
          onLoad={() => handleImageLoad(info?.id)}
        />
      ) : (
        <div className="max-h-60 object-cover rounded bg-slate-400 "></div>
      )}

      <h4 className="font-bold">{info?.name}</h4>
      <p className="text-zinc-200 text-[12px]">{info?.model}</p>
      <p className="text-zinc-400 text-sm">
      {info?.year} - {info?.km} KM
      </p>
      <strong>R$ {info?.price}</strong>
      <hr />
      <p className="font-light text-zinc-400 flex items-center gap-1">
        <FaMapMarkerAlt /> {info?.city} 
      </p>
    </article>
  );
}
