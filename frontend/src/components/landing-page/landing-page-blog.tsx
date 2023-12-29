import BlogComponent from "./blog";

import blog01 from "../../../public/images/landing-page/blog-01.jpg";
import blog02 from "../../../public/images/landing-page/blog-02.jpg";
import blog03 from "../../../public/images/landing-page/blog-03.jpg";

export default function LandingPageBlog(): JSX.Element {
  return (
    <div className="bg-bg-white">
      <div className="max-w-[1500px] m-auto  pt-12">
        <h2 className="landingPage-section-title">
          Our Latest <span className="landingPage-section-title-span">Blogs</span>
        </h2>
        <p className="landingPage-section-paragraph">
          Blog topics explore various aspects of health tech apps, including their impact on patient
          care, healthcare accessibility, telemedicine, remote monitoring, personalized medicine,
          and data privacy.
        </p>

        <div className="max-w-[1500px] m-auto p-8 lg:p-12 flex flex-col justify-center gap-y-[3rem] md:flex-row md:justify-between items-center md:gap-x-6 lg:gap-x-12">
          <BlogComponent img={blog01} />
          <BlogComponent img={blog02} />
          <BlogComponent img={blog03} />
        </div>
      </div>
    </div>
  );
}
