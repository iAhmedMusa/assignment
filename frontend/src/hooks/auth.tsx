// "use client";

// import { useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";

// import { redirectToLogin } from "@/helper/helper";

// function useAuth(types: string) {
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     try {
//       const data: any = jwtDecode(localStorage.getItem("token") || "");

//       if (data && Date.now() < data.exp * 1000 && types.includes(data.slug)) {
//         setIsAuth(true);
//       } else {
//         redirectToLogin(data.slug);
//       }
//     } catch (error) {
//       redirectToLogin("");
//     }
//   }, [types]);

//   return isAuth;
// }

// export default useAuth;
