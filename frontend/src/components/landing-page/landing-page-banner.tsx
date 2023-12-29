import BannerCard from "./banner-card";

import baner01 from "../../../public/images/landing-page/banner-01.svg";
import baner03 from "../../../public/images/landing-page/banner-03.svg";
import baner04 from "../../../public/images/landing-page/banner-04.svg";

export default function LandingPageBanner(): JSX.Element {
  return (
    <div className="landingPageImage">
      <div className="max-w-[1500px] m-auto p-4 sm:p-12 ">
        <div className="text-center text-5xl sm:text-6xl font-extrabold text-text-darkBlue leading-[60px]">
          <h3>4UDOCTORS</h3>
          <h2 className="text-3xl pt-2">The Absolute Health Care Companion </h2>
        </div>
        <p className="max-w-[800px] m-auto py-8 text-xl text-justify">
          A comprehensive SaaS platform designed to improve communication,
          streamline workflows, and enhance patient care across the healthcare
          ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-4 sm:gap-y-0 py-12">
          <BannerCard
            img={baner01}
            title="Live Video Consultation"
            des="Initiate a video consultation instantly or schedule an appointment for a future session with ease on our platform."
          />
          <BannerCard
            img={baner03}
            title="Diagnostic at your doorstep"
            des="Conduct a convenient at-home testing process and receive your test results directly in the app within 24 hours, ensuring a quick turnaround time."
          />
          <BannerCard
            img={baner04}
            title="Super Fast Support - 24/7"
            des="Get suggestions and ensure the proper medication for yourself. Ease off the extra stress of taking prior consultation and medication each time you go to a doctor."
          />
        </div>
      </div>
    </div>
  );
}
