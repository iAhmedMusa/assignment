import Image from "next/image";

import FeatureComponent from "./service-02";

import featureLogo from "../../../public/images/landing-page/feature-main.png";
import features01 from "../../../public/images/landing-page/features-01.png";
import features02 from "../../../public/images/landing-page/features-02.png";
import features03 from "../../../public/images/landing-page/features-03.png";
import features04 from "../../../public/images/landing-page/features-04.png";
import features05 from "../../../public/images/landing-page/features-05.png";
import features06 from "../../../public/images/landing-page/features-06.png";

export default function LandingPageServices02(): JSX.Element {
  return (
    <>
      {/* <div className="bg-bg-secondary px-12 pt-12 text-text-darkBlue">
      <div className="max-w-[800px] xl:max-w-[1200px] m-auto flex pt-8">
        <Image src={featureLogo} alt="features image" className="xl:w-1/2 hidden xl:block" />

        <div className="w-full xl:w-1/2 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
          <FeatureComponent img={features01} title="Medical" />
          <FeatureComponent img={features02} title="Operation" />
          <FeatureComponent img={features03} title="Patient Ward" />
          <FeatureComponent img={features04} title="Test Room" />
          <FeatureComponent img={features05} title="Laboratory" />
          <FeatureComponent img={features06} title="ICU" />
        </div>
      </div>
    </div> */}
    </>
  );
}
