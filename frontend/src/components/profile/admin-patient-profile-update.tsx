"use client";

import React, { useEffect, useState } from "react";
import { Input, Option, Select } from "@material-tailwind/react";

import api from "@/lib/api";

interface DataProps {
  userdata: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
}

interface StateProps {
  dob: Date;
  state: string;
  city: string;
  zip: Number;
  country: string;
  phone: any;
}

export default function AdminPatientProfileUpdate(props: DataProps) {
  const [items, setItems] = useState<StateProps>(Object);
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setItems({
      dob: new Date(props.userdata.dob),
      state: props.userdata.state,
      city: props.userdata.city,
      zip: props?.userdata?.zip,
      country: props.userdata.country,
      phone: props.userdata.phone_number,
    });
    setGender(props.userdata.gender);
  }, [
    props.userdata.city,
    props.userdata.country,
    props.userdata.dob,
    props.userdata.gender,
    props.userdata.state,
    props.userdata.zip,
    props.userdata.phone_number,
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
      gender: gender,
      city: items.city,
      state: items.state,
      country: items.country,
      zip: Number(items?.zip),
      dob: new Date(items.dob).toISOString(),
      phone_number: items.phone,
    };

    api
      .patch(`/users/${props.userdata.id}`, body)
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
              label="Phone Number"
              defaultValue={props.userdata.phone_number}
              name="phone"
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
              defaultValue={props.userdata.state}
              name="state"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="City"
              defaultValue={props.userdata.city}
              name="city"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="Zip"
              defaultValue={props.userdata.zip}
              name="zip"
              onChange={(event) => handleChange(event)}
            />
            <Input
              variant="outlined"
              label="Country"
              defaultValue={props.userdata.country}
              name="country"
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="date"
              variant="outlined"
              label="DOB"
              defaultValue={props.userdata.dob}
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
