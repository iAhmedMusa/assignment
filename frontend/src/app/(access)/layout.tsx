import { AuthProvider } from "@/context-api/context-provider";
import Loader from "@/constants/loader";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <AuthProvider>
      <Loader />

      <div className="flex flex-col xl:flex-row">
        <Sidebar />

        <div className="w-full flex-col grow order-1 bg-bg-secondary h-[calc(100dvh_-_88px)] xl:h-auto">
          <div className="hidden xl:block">
            <Header />
          </div>
          <div className="flex px-[32px] py-[24px] gap-[24px] max-h-[calc(100dvh_-_92px)] overflow-y-auto">
            {props.children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
