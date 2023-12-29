import Image from "next/image";
import doctor from "../../../public/images/doctors/doctor-male.png";

interface UserDataProps {
  userInfo: any;
  userData: any;
  setIsModalOpen: any;
}

function UserProfile(props: UserDataProps) {
  const userType = props.userData.type;

  return (
    <div className="mt-14 lg:mt-0">
      <div>
        <h1 className="text-text-darkBlue text-center text-[35px]">Profile Information</h1>
        <div className=" mt-4">
          <Image
            className="m-auto  rounded-full border-2 border-bg-primary pt-2"
            src={doctor}
            alt="doctor image"
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col ml-6  mt-14 gap-x-5 md:gap-x-28 ">
          {/* name  */}
          <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
            <h1 className="text-[18px] mt-4">Name:</h1>
            <h1 className="text-[18px] mt-4">{props.userData.name}</h1>
          </div>

          {/* email area  */}
          <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
            <h1 className="text-[18px] mt-4">Email:</h1>
            <h1 className="text-[18px] mt-4">{props.userData.email}</h1>
          </div>

          {/* phone number area  */}
          <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
            <h1 className="text-[18px] mt-4 capitalize ">phone number:</h1>
            <h1 className="text-[18px] mt-4 ">
              {props.userData.phone_number ? props.userData.phone_number : "N/A"}
            </h1>
          </div>

          {/* DOB area  */}
          <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
            <h1 className="text-[18px] mt-4 capitalize ">Date Of Birth:</h1>
            <h1 className="text-[18px] mt-4 flex-1">
              {props.userData.dob ? props.userData.dob : "N/A"}
            </h1>
          </div>

          <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
            <h1 className="text-[18px] mt-4 capitalize ">City:</h1>
            <h1 className="text-[18px] mt-4 flex-1">
              {" "}
              {props.userData?.city ? props.userData?.city : "N/A"}
            </h1>
          </div>

          <span className={`${userType == "patient" || userType == "admin" ? "hidden" : "block"}`}>
            <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
              {userType === "doctor" && <h1 className="text-[18px] mt-4">Specialities:</h1>}
              {userType === "doctor" && (
                <h1 className="text-[18px] mt-4">{props.userInfo?.specialist}</h1>
              )}
            </div>

            <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
              <h1 className="text-[18px] mt-4">Reg Number:</h1>
              <h1 className="text-[18px] mt-4">{props.userInfo?.reg_number}</h1>
            </div>

            <div className="flex md:grid grid-cols-2 items-center gap-x-5 md:gap-x-0">
              <h1 className="text-[18px] mt-4">Experince:</h1>
              <h1 className="text-[18px] mt-4">
                {props.userInfo?.experience ? `${props.userInfo?.experience} years` : "N/A"}
              </h1>
            </div>
          </span>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-bg-primary text-bg-secondary px-20 sm:px-40 py-2 rounded-md my-10 "
            onClick={() => {
              if (window !== undefined) {
                props.setIsModalOpen(true);
                (window as any).editModal.showModal();
              }
            }}
          >
            Edit Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
