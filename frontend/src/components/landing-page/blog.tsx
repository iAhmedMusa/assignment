import Image from "next/image";

interface BlogProps {
  img: any;
}

export default function BlogComponent(props: BlogProps): JSX.Element {
  return (
    <div className="card min-w-[200px] max-w-[350px] bg-bg-secondary shadow-xl">
      <Image src={props.img} alt="blog image" className="landing-page-blog-image" />
      <div className="card-body md:p-3 lg:p-4">
        <h2 className="card-title">
          Children
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>5 Great reasons to use an online doctor</p>
        <div className="card-actions justify-end mt-3">
          <button className="btn bg-bg-primary text-text-secondary border-none hover:bg-text-darkBlue capitalize">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
