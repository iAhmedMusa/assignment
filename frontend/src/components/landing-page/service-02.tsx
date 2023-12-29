import Image from "next/image";

interface ServiceProps {
  img: any;
  title: string;
}

export default function ServiceComponent(props: ServiceProps): JSX.Element {
  return (
    <>
      <div className="min-w-[180px] p-6 bg-bg-white rounded-md">
        <div className="p-4 md:p-6 bg-bg-secondary rounded-lg flex justify-center items-center">
          <Image src={props.img} alt="features" width={100} height={100} />
        </div>
        <p className="px-4 text-center">{props.title}</p>
      </div>
    </>
  );
}
