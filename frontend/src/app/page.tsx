import LandingPageHeader from "@/components/landing-page/landing-page-header";
import LandingPageBanner from "@/components/landing-page/landing-page-banner";
import LandingPageUserProfile from "@/components/landing-page/landing-page-user-profile";
import LandingPageServices01 from "@/components/landing-page/landing-page-services-1";
import LandingPageSpecialities from "@/components/landing-page/landing-page-specialities";
import LandingPageServices02 from "@/components/landing-page/landing-page-services-2";
import LandingPageDoctors from "@/components/landing-page/landing-page-doctors";
import LandingPageBlog from "@/components/landing-page/landing-page-blog";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";

export default function Home() {
  return (
    <div id="home">
      <div className="sticky top-0 z-50">
        <LandingPageHeader />
      </div>
      <div>
        <LandingPageBanner />
      </div>
      <LandingPageUserProfile />
      <div id="services">
        <LandingPageServices01 />
      </div>
      <div id="specialities">
        <LandingPageSpecialities />
      </div>
      <LandingPageServices02 />
      <div id="doctors">
        <LandingPageDoctors />
      </div>
      <div id="blog">
        <LandingPageBlog />
      </div>
      <LandingPageFooter />
    </div>
  );
}
