import HeaderUser from "./header-user";

export default function Header(): JSX.Element {
  return (
    <div className="w-full flex justify-end items-center px-[24px] py-2 bg-bg-white border-b border-layout-border">
      {/* right */}
      <HeaderUser />
    </div>
  );
}
