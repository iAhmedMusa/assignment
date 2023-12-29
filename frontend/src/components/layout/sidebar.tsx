import LogOut from "./logout";
import SidebarHeader from "./sidebar-header";
import SidebarMenu from "./sidebar-menu";

export default function Sidebar(): JSX.Element {
  return (
    <div className="min-w-[250px] h-[83px] xl:h-[100dvh] pb-[24px] flex-col items-center bg-bg-white">
      <SidebarHeader />
      <div className="hidden xl:block">
        <SidebarMenu />
        <div className="fixed bottom-4 hidden xl:block">
          <LogOut />
        </div>
      </div>
    </div>
  );
}
