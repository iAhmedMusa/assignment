"use client";
import Link from "next/link";

interface UserProfileProps {
  title: string;
  desc: string;
  btn: string;
  bgColor: any;
  textColor: any;
  role: string;
}

export default function UserProfileComponent(props: UserProfileProps): JSX.Element {
  return (
    <div className={`card w-[350px] ${props.bgColor} text-primary-content user-profile-card`}>
      <div className="card-body">
        <h2 className={`card-title ${props.textColor} font-bold text-2xl`}>{props.title}</h2>
        <p className={`${props.textColor} text-justify`}>{props.desc}</p>
        <div className="card-actions justify-center mt-4">
          <Link
            href={{
              pathname: "/registration",
              query: { position: `${props.role}` },
            }}
            className="w-full btn bg-bg-secondary text-text-darkBlue user-profile-button"
          >
            {props.btn}
          </Link>
        </div>
      </div>
    </div>
  );
}
