import SpecialitiesIcon from "./specialities-check-icons";

export default function LandingPageSpecialities(): JSX.Element {
  return (
    <div className="bg-bg-secondary sm:px-12 pt-12 text-text-darkBlue">
      <h2 className="landingPage-section-title">
        Available <span className="landingPage-section-title-span">Specialities</span>
      </h2>
      <p className="landingPage-section-paragraph text-[#A6ADBA]">
        Our platform connects patients with highly qualified doctors across various disciplines,
        enabling them to receive specialized care tailored to their specific needs
      </p>

      <div className="max-w-[1500px] m-auto pt-12 text-lg grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12 pl-16 sm:pl-12 lg:pl-24">
        <div className="flex  items-center  gap-x-3 ">
          <SpecialitiesIcon />
          General Physician
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Pediatrics / Child Care
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Gynaecology
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Neurology / Brain
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Pulmonology / Lungs
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Nutritionis
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Gastroenterology
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Cardiology / Heart
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Ophthalmology / Eye
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Dentistry / Dental Care
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Endocrinology / Diabetes
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Occupational therapy
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Nephrology / Kidney
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Obstetrics{" "}
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          ENT / Ear, Nose and Throat
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Parasitology
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Podiatry
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Oncology
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Podiatry
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Dermatology
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Psychological counsellor
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Rheumatology
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Urology
        </div>
        <div className="flex items-center gap-x-3">
          <SpecialitiesIcon />
          Chiropractic
        </div>
      </div>
    </div>
  );
}
