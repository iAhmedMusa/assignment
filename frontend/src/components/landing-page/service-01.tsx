import Image from "next/image";

interface ServiceProps {
  img: any;
  title: string;
  des: string;
}

export default function Service(props: ServiceProps): JSX.Element {
  return (
    <div className="card w-[350px] sm:w-96 text-text-darkBlue">
      <div className="card-body flex-row gap-x-6">
        <div className="min-w-[50px] ">
          <Image className="h-[50px]" src={props.img} alt="services" width={50} height={50} />
        </div>
        <div>
          <h2 className="card-title mb-2">{props.title}</h2>
          <p className="text-justify text-[15px] line-clamp-4"> {props.des}</p>
        </div>
      </div>
    </div>
  );
}
