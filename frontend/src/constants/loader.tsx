"use client";

import { useAuthToken } from "@/context-api/context-provider";

export default function Loader() {
  const { decodedToken } = useAuthToken();

  return (
    <div>
      {decodedToken == null ? (
        <div className="w-full h-[100vh] flex justify-center items-center absolute top-0 left-0 bg-white opacity-5 z-50">
          <>
            {/* <Bars
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="bars-loading"
            visible={true}
          /> */}
          </>
        </div>
      ) : null}
    </div>
  );
}
