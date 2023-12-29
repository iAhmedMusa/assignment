import Service from "./service-01";

import verifiedDoctor from "../../../public/images/services-landing-page/verified__doctors.svg";
import videoConsult from "../../../public/images/services-landing-page/instant__video__consultation.svg";
import instantPrescription from "../../../public/images/services-landing-page/Instant_electronics_prescription.svg";
import payment from "../../../public/images/services-landing-page/easy__payment.svg";
import betterConsult from "../../../public/images/services-landing-page/better__consultation__quality.svg";
import healthHistory from "../../../public/images/services-landing-page/health__history.svg";
import support from "../../../public/images/services-landing-page/super__fast__support.svg";
import medicineDelivered from "../../../public/images/services-landing-page/medicine__delivered.svg";
import reminder from "../../../public/images/services-landing-page/mobile__reminder.svg";

export default function LandingPageServices01(): JSX.Element {
  return (
    <div className="bg-bg-white">
      <div className="max-w-[1500px] m-auto   pt-12 text-text-darkBlue">
        <h2 className="landingPage-section-title">
          Available <span className="landingPage-section-title-span">Services</span>
        </h2>
        <p className="  landingPage-section-paragraph text-[#A6ADBA] text-justify">
          Our services include a wide range of aspects that cover doctor needs, patient needs, and
          pharmacist needs. Focusing on patient&apos;s needs is the most important task of our
          company, but this excludes services for doctors and pharmacists because they will have an
          equal role in helping the patient.
        </p>

        <div className="max-w-[1500px] m-auto grid md:grid-cols-2 md:grid-rows-4 xl:grid-cols-3 xl:grid-rows-3 py-4 justify-center place-items-center">
          <Service
            img={verifiedDoctor}
            title="Verified doctors"
            des="4uDoctors offers certified and registered doctors consultancies for the patient and top notch pharmacists to assist them. We conduct a thorough verification process to confirm their credentials and ensure their expertise matches the healthcare needs of our patients."
          />
          <Service
            img={videoConsult}
            title="Video consultation"
            des="We understand the importance of prompt access to healthcare, and our streamlined system ensures that consultations can be initiated swiftly following the payment process. This efficient approach minimizes waiting times, allowing patients to connect with doctors and receive the care they need without unnecessary delays. "
          />
          <Service
            img={instantPrescription}
            title="Electronics prescription"
            des="Doctors will instantly provide a full proof prescription and other necessary documents so that the patient can go through and make themselves clear about their healthcare advice, and at the same time, the pharmacist can also suggest a better dosage or intractability for the patient."
          />
          <Service
            img={payment}
            title="Easy payment options"
            des="Our secured payment gateway provides better and easier payment facilities for patients. Our partners include Visa, Mastercard, Debit, Credit, and prepaid as well."
          />
          <Service
            img={betterConsult}
            title="Quality consultation "
            des=" We are vigilant about your ratings and feedback and thus keep ourselves constantly updated regarding our services and keep our doctors committed to providing the best consultation for patients."
          />
          <Service
            img={healthHistory}
            title="Health history"
            des="We have made it easier for patients to retrieve their consultation history and prescriptions; as a result, they can get back their suggestions and diagnoses very easily."
          />
          <Service
            img={support}
            title="Super fast support"
            des="We have set up a dedicated customer care report in order to help each and every person in their need and to assist with anything a patient, a user, or even a doctor/pharmacist needs."
          />
          <Service
            img={medicineDelivered}
            title="Doorstep diagnostic "
            des="Telemedicine services are available and can be accessed very easily. This flexible and accessible healthcare approach brings convenience and timely medical care to individuals, especially those with limited mobility, busy schedules, or who live in remote areas."
          />
          <Service
            img={reminder}
            title="Medicine reminder"
            des="Our medicine reminder service allows users to set up personalized reminders for taking their medications at the prescribed times."
          />
        </div>
      </div>
    </div>
  );
}
