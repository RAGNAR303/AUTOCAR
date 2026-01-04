import type { ReactNode } from "react";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export function CustonCorousel({ children }: { children: ReactNode }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      customTransition="all 0.5s"
      transitionDuration={500}
      infinite={true}
      showDots={true}
      customDot={<CustomDots />}
      arrows={true}
      customLeftArrow={<CustomArrowsLeft />}
      customRightArrow={<CustomArrowsRight />}
      className="drop-shadow shadow  
                  rounded  bg-zinc-800/80 p-1 mb-2"
    >
      {children}
    </Carousel>
  );
}

function CustomDots({ onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={` rounded-full transition-all mx-1  mb-2
    ${active ? "bg-red-700/80 w-3 h-3" : "bg-zinc-700/60 w-3 h-3 border-2 border-transparent "}`}
    />
  );
}

type ArrowProps = {
  onClick?: () => void;
};

function CustomArrowsRight({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 absolute  right-1 rounded-full transition-all border-2 mb-2 bg-zinc-950/40 border-zinc-500/60
         hover:bg-red-700/80  hover:border-zinc-100/60`}
    >
      <RiArrowRightSFill className="text-4xl" />
    </button>
  );
}

function CustomArrowsLeft({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 absolute  left-1 rounded-full transition-all border-2 mb-2  bg-zinc-950/40 border-zinc-500/60
         hover:bg-red-700/80  hover:border-zinc-100/60`}
    >
      <RiArrowLeftSFill className="text-4xl" />
    </button>
  );
}
