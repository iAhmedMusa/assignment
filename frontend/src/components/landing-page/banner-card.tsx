import Image from "next/image";

interface BannerCardProps {
  img: any;
  title: string;
  des: string;
}

export default function BannerCard(props: BannerCardProps): JSX.Element {
  return (
    <div className="card w-[350px] sm:w-96 bg-bg-secondary text-text-darkBlue text-justify cursor-pointer transition-all duration-500 delay-200 shadow-md hover:shadow-xl hover:scale-105">
      <div className="card-body">
        <Image src={props.img} alt="banner image" width={50} height={50} />
        <p className="text-lg font-bold">{props.title}</p>
        <p>{props.des}</p>
      </div>
    </div>
  );
}
