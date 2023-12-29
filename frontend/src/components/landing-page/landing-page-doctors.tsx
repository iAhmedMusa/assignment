"use client";

import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import DoctorComponent from "./doctor";

import api from "@/lib/api";

export default function LandingPageDoctors(): JSX.Element {
  const [doctors, setDoctors]: any = useState([]);

  useEffect(() => {
    api
      .get(`/doctors`)
      .then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
        } else if (Array.isArray(data)) {
          setDoctors(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="bg-bg-white">
      <div className="max-w-[1500px] py-12 m-auto px-4">
        <h2 className="landingPage-section-title">
          Book Our
          <span className="landingPage-section-title-span"> Best Doctors</span>
        </h2>
        <p className="landingPage-section-paragraph">
          Access to expert physicians and surgeons, advanced technologies and
          top-quality surgery facilities right here.
        </p>
        {doctors.length != 0 && (
          <div className="max-w-[1500px] m-auto pt-[48px] px-4  relative">
            {/* slider */}
            <Swiper
              slidesPerView={4}
              spaceBetween={50}
              loop={true}
              navigation={{
                nextEl: ".image-swiper-button-next",
                prevEl: ".image-swiper-button-prev",
                disabledClass: "swiper-button-disabled",
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              modules={[Navigation, Autoplay]}
              className="mySwiper max-w-[1500px] m-auto"
              breakpoints={{
                // when window width is >= 250px

                220: {
                  slidesPerView: 1,
                },

                770: {
                  slidesPerView: 2,
                },

                1150: {
                  slidesPerView: 3,
                },
                1450: {
                  slidesPerView: 4,
                },
              }}
            >
              {doctors.map((el: any) => {
                return (
                  <SwiperSlide key={el.id}>
                    <div className=" flex justify-center">
                      <DoctorComponent
                        id={el.id}
                        name={el.user.name}
                        gender={el.user.gender}
                        location={el.user.city}
                        expertise={el.specialist}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
        <div className="text-end">
          <a className="text-end text-text-primary" href="/all-doctors">
            view all doctors
          </a>
        </div>
      </div>
    </div>
  );
}
