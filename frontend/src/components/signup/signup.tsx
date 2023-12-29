"use client";

import { Input } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";

import LandingPageHeader from "../landing-page/landing-page-header";

import api from "@/lib/api";

export default function Signup(): JSX.Element {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [retypePassword, setRetypePassword] = useState(false);
  const [error, setError] = useState("");

  const [items, setItems] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  function togglePasswordVisibility(e: any) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }
  function toggleRepasswordVisibility(e: any) {
    e.preventDefault();
    setRetypePassword((prevState) => !prevState);
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setItems((prevItem) => {
      const newItem: any = { ...prevItem };
      newItem[`${name}`] = value;
      return newItem;
    });
  };

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider).then((result) => {
  //     if (result?.user) {
  //       let body = {
  //         name: result?.user?.displayName,
  //         email: result?.user?.email,
  //       };

  //       api.post(`/users/auth-user`, body).then(({ data, status }) => {
  //         if (status !== 201) {
  //           console.log(data);
  //         } else {
  //           let userInfo = jwtDecode(data.access_token);

  //           localStorage.setItem("token", data.access_token);
  //           sessionStorage.setItem("login", "true");

  //           router.push("/dashboard");
  //         }
  //       });
  //     }
  //   });
  // };

  const addUser = (e: any) => {
    e.preventDefault();

    let body = {
      name: items.name,
      email: items.email,
      password: items.password,
      phone_number: items.number,
    };

    api.post(`/users`, body).then(({ data, status }) => {
      if (status !== 201) {
        console.log(data);
      } else if (data.access_token) {
        let userInfo: any = jwtDecode(data.access_token);
        localStorage.setItem("token", data.access_token);
        sessionStorage.setItem("login", "true");

        if (userInfo.type) {
          router.push("/dashboard");
        }
      } else {
        setError(data.message);
      }
    });
    // .catch(({ response: { data } }) => setError(data.message));
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] loginImage">
        <LandingPageHeader />
        <div className=" h-[calc(100vh-75px)]  flex  justify-center items-center gap-y-10">
          <div className="w-[550px]  bg-bg-white opacity-80 sm:rounded-lg sm:shadow-xl">
            <h1 className="text-[30px] text-center text-[#1dbfc1] mt-3 sm:mt-[50px]">
              Sign-Up
            </h1>
            <h1 className="text-[13px] text-center text-[#172b4c] mt-[10px]">
              Register for more
            </h1>

            <form
              onSubmit={addUser}
              className="w-[100%] flex justify-center flex-col items-center mt-3 sm:mt-10"
            >
              <div className="relative w-[80%] container mx-auto rounded-md mt-4">
                <Input
                  required
                  type="text"
                  color="teal"
                  label="Name"
                  name="name"
                  defaultValue={items.name}
                  onChange={(event) => handleChange(event)}
                />
              </div>

              <div className="relative w-[80%] container mx-auto mt-4 rounded-md ">
                <Input
                  required
                  type="email"
                  color="teal"
                  label="Email"
                  name="email"
                  defaultValue={items.email}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="relative w-[80%] container mx-auto mt-4 rounded-md ">
                <Input
                  required
                  type="tel"
                  color="teal"
                  label="Phone Number"
                  name="number"
                  defaultValue={items.number}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="relative w-[80%] container mx-auto mt-4 rounded-md ">
                <Input
                  required
                  type={isPasswordVisible ? "text" : "password"}
                  color="teal"
                  label="Passwords"
                  name="password"
                  defaultValue={items.password}
                  onChange={(event) => handleChange(event)}
                />

                <div
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="relative w-[80%] container mx-auto mt-4 rounded-md ">
                <Input
                  required
                  type={retypePassword ? "text" : "password"}
                  color={
                    items.password == items.retypePassword ? "teal" : "red"
                  }
                  label="Confirm Password"
                  name="retypePassword"
                  defaultValue={items.retypePassword}
                  onChange={(event) => handleChange(event)}
                />

                <div
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={toggleRepasswordVisibility}
                >
                  {retypePassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <button
                disabled={items.password == items.retypePassword ? false : true}
                type="submit"
                className="w-[80%] h-[42px] my-4 rounded-md bg-[#1DBFC1] text-[16px] text-bg-white "
              >
                Sign-up
              </button>
            </form>
            {/* <button
              onClick={() => {
                signInWithGoogle();
              }}
              className="w-[80%] h-[42px] rounded-md bg-bg-secondary flex text-center justify-center items-center gap-x-5 border-b-2 m-auto"
            >
              <Image
                src={google.src}
                alt="google"
                width={28}
                height={28}
              ></Image>
              Sign up with Google
            </button> */}

            <h1 className="text-center text-red-400 text-[12px] mt-2">
              {error}
            </h1>

            <h1 className="text-[12px] text-center mt-4 mb-[50px]">
              Already have an account?{" "}
              <button
                className="text-[#ee3158]"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/signin");
                }}
              >
                Sign In
              </button>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
