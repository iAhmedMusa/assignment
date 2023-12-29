"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";

import LandingPageHeader from "../landing-page/landing-page-header";

import api from "@/lib/api";

export default function DocReg() {
  const router = useSearchParams();
  let pos = router.get("position");
  const route = useRouter();

  const [title, setTitle] = useState("");
  const [specialities, setSpecialities] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [retypePassword, setRetypePassword] = useState(false);
  const [isChecked, setIsChecked]: any = useState();
  const [error, setError]: any = useState();
  const [data, setData]: any = useState([]);

  const [items, setItems] = useState({
    firstName: "",
    lastNane: "",
    regNumber: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setItems((prevItem) => {
      const newItem: any = { ...prevItem };
      newItem[`${name}`] = value;
      return newItem;
    });
  };

  useEffect(() => {
    api.get(`/type-of-specialties`).then(({ data, status }) => {
      if (status !== 200) {
        console.log(data);
      } else if (Array.isArray(data)) {
        setData(data);
      }
    });
  }, []);

  function togglePasswordVisibility(e: any) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleRepasswordVisibility(e: any) {
    e.preventDefault();
    setRetypePassword((prevState) => !prevState);
  }

  const addDoctor = (e: any) => {
    e.preventDefault();

    let body = {
      name: items.firstName + " " + items.lastNane,
      email: items.email,
      password: items.password,
      phone_number: items.number,
      title: title,
      reg_number: items.regNumber,
      specialist: specialities,
    };

    api
      .post(`/doctors`, body)
      .then(({ data, status }) => {
        if (status !== 201) {
          console.log(data);
        } else if (data.access_token) {
          let userInfo: any = jwtDecode(data.access_token);
          localStorage.setItem("token", data.access_token);
          sessionStorage.setItem("login", "true");

          if (userInfo.type) {
            route.push("/dashboard");
          }
        }
      })
      .catch(({ response: { data } }) => setError(data.message));
  };

  const addPharmacist = (e: any) => {
    e.preventDefault();

    let body = {
      title: "Pharmacist",
      reg_number: items.regNumber,
      name: items.firstName + " " + items.lastNane,
      email: items.email,
      phone_number: items.number,
      password: items.password,
    };

    api
      .post(`/pharmacists`, body)
      .then(({ data, status }) => {
        if (status !== 201) {
          console.log(data);
        } else if (data.access_token) {
          let userInfo: any = jwtDecode(data.access_token);
          localStorage.setItem("token", data.access_token);
          sessionStorage.setItem("login", "true");

          if (userInfo.type) {
            route.push("/dashboard");
          }
        }
      })
      .catch(({ response: { data } }) => setError(data.message));
  };

  return (
    <>
      <LandingPageHeader />
      <div
        className={`w-[100vw] sm:h-[calc(100vh-72px)] ${
          pos == "Doctor" ? "docImage" : "pharmaImage"
        }`}
      >
        <div
          className={`sm:h-[calc(100vh-75px)]  flex justify-center ${
            pos == "Doctor" ? "lg:justify-start" : "lg:justify-start"
          }  lg:px-20 2xl:px-32  items-center  `}
        >
          <div className="w-[600px] opacity-90 rounded-lg sm:shadow-lg bg-bg-white  ">
            <h1 className="text-[30px] text-center text-text-primary mt-[25px]">
              Register as {pos}
            </h1>
            <form
              onSubmit={pos == "Doctor" ? addDoctor : addPharmacist}
              className="w-[100%] flex justify-center flex-col items-center mt-6"
            >
              <div
                className={`relative w-[80%] container mx-auto rounded-md ${
                  pos == "Pharmacist" ? "hidden" : "block"
                }`}
              >
                <Select
                  name="title"
                  value={title}
                  onChange={(event: any) => {
                    setTitle(event);
                  }}
                  color="teal"
                  label="Title"
                >
                  <Option value="Dr">Dr.</Option>
                  <Option value="Prof Dr">Prof Dr.</Option>
                  <Option value="Assoc Prof Dr">Assoc Prof Dr.</Option>
                  <Option value="Asst Prof Dr">Asst Prof Dr.</Option>
                </Select>
              </div>
              <div className=" w-[80%] container mx-auto rounded-md mt-4 sm:flex gap-4 ">
                <div className="sm:w-[50%] ">
                  <Input
                    required
                    type="text"
                    name="firstName"
                    defaultValue={items.firstName}
                    color="teal"
                    label="First Name"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
                <div className="sm:w-[50%] mt-6 sm:mt-0">
                  <Input
                    required
                    type="text"
                    name="lastNane"
                    defaultValue={items.lastNane}
                    color="teal"
                    label="Last Name"
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>

              <div className=" w-[80%] container mx-auto rounded-md mt-4 sm:flex gap-4 ">
                <Input
                  required
                  type="text"
                  name="regNumber"
                  defaultValue={items.regNumber}
                  color="teal"
                  label="Reg Number"
                  onChange={(event) => handleChange(event)}
                />

                <div className={`mt-6 sm:mt-0 ${pos == "Pharmacist" ? "hidden" : "block"}`}>
                  <Select
                    id="specialities"
                    name="specialities"
                    defaultValue={specialities}
                    color="teal"
                    label="Specialities"
                    onChange={(event: any) => {
                      setSpecialities(event);
                    }}
                  >
                    {data?.map((data: any, index: number) => {
                      return (
                        <Option value={data} key={index}>
                          {data}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>

              <div className="relative w-[80%] container mx-auto mt-4 rounded-md ">
                <Input
                  required
                  type="tel"
                  name="number"
                  defaultValue={items.number}
                  color="teal"
                  label="Phone Number"
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="relative w-[80%] container mx-auto mt-4 rounded-md ">
                <Input
                  required
                  type="email"
                  name="email"
                  defaultValue={items.email}
                  color="teal"
                  label="Email"
                  onChange={(event) => handleChange(event)}
                />
              </div>

              <div className="relative w-[80%] container mx-auto mt-4 rounded-md ">
                <Input
                  required
                  name="password"
                  defaultValue={items.password}
                  type={isPasswordVisible ? "text" : "password"}
                  color="teal"
                  label="Password"
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
                  color={items.password == items.confirmPassword ? "teal" : "red"}
                  label="Confirm Password"
                  name="confirmPassword"
                  defaultValue={items.confirmPassword}
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

              <div className="w-[80%] container mx-auto mt-4 rounded-md flex items-center gap-3 sm:gap-6">
                <input
                  required
                  type="checkbox"
                  className="accent-bg-primary w-5 h-5"
                  onChange={(event) => setIsChecked(event.target.checked)}
                />

                <h1 className="text-[13px] sm:text-[14] text-center ">
                  <span className="hidden sm:inline-block">I accept </span>
                  <a className="text-[#ee3158]" href="">
                    {" "}
                    Terms conditions{" "}
                  </a>
                  and{" "}
                  <a className="text-[#ee3158]" href="">
                    Privacy Policy.
                  </a>
                </h1>
              </div>

              <h1 className="text-center text-red-400 text-[12px] mt-2">{error}</h1>

              <div className="w-[80%] flex justify-center items-center sm:justify-between flex-col sm:flex-row  ">
                <button
                  type="submit"
                  className="w-[45%] h-[42px] mt-2 mb-8 rounded-md bg-bg-primary text-[16px] text-bg-white "
                >
                  Register
                </button>
                <h1 className="text-[14px] text-center sm:mt-6 mb-[50px]">
                  Already have an account?{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      route.push("/signin");
                    }}
                    className="text-[#ee3158]"
                  >
                    Sign In
                  </button>
                </h1>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
