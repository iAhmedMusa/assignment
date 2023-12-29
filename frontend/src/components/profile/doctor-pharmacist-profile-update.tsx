"use client";

import React, { useEffect, useState } from "react";
import { Input, Option, Select } from "@material-tailwind/react";

import api from "@/lib/api";

interface DataProps {
  userInfo: any;
  userType: any;
  userTypeID: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
}

interface StateProps {
  title: string;
  experience: string;
  bio: string;
  dob: Date;
  state: string;
  city: string;
  zip: string | number;
  country: string;
}

export default function DoctorPharmacistProfileUpdate(props: DataProps) {
  const [items, setItems] = useState<StateProps>(Object);
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setItems({
      title: props.userInfo.title,
      experience: props.userInfo.experience,
      bio: props.userInfo.bio,
      dob: new Date(props.userInfo.user?.dob),
      state: props.userInfo.user?.state,
      city: props.userInfo.user?.city,
      zip: props.userInfo.user?.zip,
      country: props.userInfo.user?.country,
    });
    setGender(props.userInfo.user?.gender);
  }, [
    props.userInfo.bio,
    props.userInfo.experience,
    props.userInfo.title,
    props.userInfo.user?.city,
    props.userInfo.user?.country,
    props.userInfo.user?.dob,
    props.userInfo.user?.gender,
    props.userInfo.user?.state,
    props.userInfo.user?.zip,
  ]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setItems((prevItem) => {
      const newItem: any = { ...prevItem };
      newItem[`${name}`] = value;
      return newItem;
    });
  };

  const handleEditUser = (e: any) => {
    e.preventDefault();

    let body = {
      title: items.title ? items.title : null,
      experience: items.experience ? Number(items.experience) : null,
      gender: gender ? gender : null,
      dob: items.dob ? new Date(items.dob).toISOString() : null,
      bio: items.bio ? items.bio : null,
      city: items.city ? items.city : null,
      state: items.state ? items.state : null,
      country: items.country ? items.country : null,
      zip: items.zip ? Number(items.zip) : null,
    };

    api
      .patch(`/${props.userType}/${props.userTypeID}`, body)
      .then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
        } else {
          if (window !== undefined) {
            props.setIsModalOpen(false);
            (window as any).editModal.close();
          }
        }
      })
      .catch(({ response: { data } }) => setError(data.message));
  };

  return (
    <>
      <dialog id="editModal" className={`modal modal-middle`}>
        <form method="dialog" className={`modal-box bg-bg-secondary text-text-darkBlue`}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>

          <h2 className="text-xl font-bold pb-4">Edit Profile</h2>
          {/*modal content */}
          <div className="flex flex-col gap-y-4">
            <Input
              variant="outlined"
              label="Title"
              defaultValue={props.userInfo.title}
              name="title"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="Experience"
              defaultValue={props.userInfo.experience}
              name="experience"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="Bio"
              defaultValue={props.userInfo.bio}
              name="bio"
              onChange={(event) => handleChange(event)}
            />
            <Select
              id="gender"
              name="gender"
              value={gender}
              color="teal"
              label="Gender"
              onChange={(event: any) => {
                setGender(event);
              }}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
            <Input
              variant="outlined"
              label="State"
              defaultValue={props.userInfo.user?.state}
              name="state"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="City"
              defaultValue={props.userInfo.user?.city}
              name="city"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="Zip"
              defaultValue={props.userInfo.user?.zip}
              name="zip"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="Country"
              defaultValue={props.userInfo.user?.country}
              name="country"
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="date"
              variant="outlined"
              label="DOB"
              defaultValue={props.userInfo.user?.dob}
              name="dob"
              onChange={(event) => handleChange(event)}
            />
          </div>

          <button
            onClick={handleEditUser}
            className="btn bg-bg-primary text-text-white border-none mt-4 hover:bg-bg-primary tracking-wider w-full"
          >
            Confirm
          </button>
        </form>

        {/* close modal to click anywhere */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
