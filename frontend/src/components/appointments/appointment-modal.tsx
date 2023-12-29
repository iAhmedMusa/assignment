"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox, Input, Textarea } from "@material-tailwind/react";

import api from "@/lib/api";

interface DoctorProps {
  doctorId: string;
  docname: string;
  expertise: string;
  isModalOpen: boolean;
  setIsModalOpen: any;
  appointId: any;
}

export default function AppointmentModal(props: DoctorProps): JSX.Element {
  const router = useRouter();

  const [items, setItems] = useState({
    disease: "",
    age: "",
    weight: "",
    alcohol: "",
    smoking: "",
    surgeries: "",
    diabetes: "",
    bloodPressure: "",
    allergies: "",
    details: "",
  });

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;
    setItems((prevItem) => {
      const newItem: any = { ...prevItem };
      newItem[`${name}`] = value;
      return newItem;
    });
  };

  const handleCheckbox = (event: any) => {
    const { name, checked } = event.target;
    setItems((prevItem) => {
      const newItem: any = { ...prevItem };
      newItem[`${name}`] = checked;
      return newItem;
    });
  };

  const handleAppointment = (e: any) => {
    e.preventDefault();

    let body = {
      disease: items.disease,
      weight: Number(items.weight),
      allergies: items.allergies ? items.allergies : false,
      diabetes: items.diabetes ? items.diabetes : false,
      blood_pressure: items.bloodPressure ? items.bloodPressure : false,
      smoking_habit: items.smoking ? items.smoking : false,
      alcohol_consumption: items.alcohol ? items.alcohol : false,
      details: items.details,
      appointment_id: props.appointId,
      age: Number(items.age),
      // surgeries: items.surgeries ? items.surgeries : false,
      // doctorId: props.doctorId,
    };

    api.post(`/prescriptions`, body).then(({ data, status }) => {
      if (status !== 201) {
        console.log(data);
      } else {
        if (window !== undefined) {
          props.setIsModalOpen(false);
          (window as any).appointmentModal.close();
        }

        router.push("/prescriptions");
      }
    });
  };

  return (
    <>
      <dialog id="appointmentModal" className="modal modal-middle">
        <form method="dialog" className="modal-box bg-bg-secondary text-text-darkBlue">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>

          <h2 className="text-xl font-bold pb-4">Get Advice Now</h2>
          {/*modal content */}
          <div className="flex flex-col gap-y-4">
            <Input variant="outlined" label="Doctor Name" defaultValue={props.docname} disabled />
            <Input variant="outlined" label="Expertise" defaultValue={props.expertise} disabled />
            <div className="flex flex-col extraSmall:flex-row gap-x-12 gap-y-4 extraSmall:gap-y-0">
              <Input
                required
                variant="outlined"
                label="Age"
                defaultValue={items.age}
                name="age"
                onChange={(event) => handleChange(event)}
              />
              <Input
                required
                variant="outlined"
                label="Weight"
                defaultValue={items.weight}
                name="weight"
                onChange={(event) => handleChange(event)}
              />
            </div>
            <Input
              required
              variant="outlined"
              label="Injury/Disease"
              defaultValue={items.disease}
              name="disease"
              onChange={(event) => handleChange(event)}
            />
            <div className="grid xs:grid-cols-2">
              <Checkbox
                id="allergies"
                label="Allergies"
                color="indigo"
                name="allergies"
                onChange={(event) => handleCheckbox(event)}
              />
              <Checkbox
                id="diabetes"
                label="Diabetes"
                color="indigo"
                onChange={(event) => handleCheckbox(event)}
                name="diabetes"
              />
              <Checkbox
                id="bloodPressure"
                label="Blood Pressure"
                color="indigo"
                name="bloodPressure"
                onChange={(event) => handleCheckbox(event)}
              />
              <Checkbox
                id="surgeries"
                label="Surgeries"
                color="indigo"
                name="surgeries"
                onChange={(event) => handleCheckbox(event)}
              />
              <Checkbox
                id="smoking"
                label="Smoking Habit"
                color="indigo"
                name="smoking"
                onChange={(event) => handleCheckbox(event)}
              />
              <Checkbox
                id="alcohol"
                label="Alcohol Consumption"
                color="indigo"
                name="alcohol"
                onChange={(event) => handleCheckbox(event)}
              />
            </div>
            <Textarea
              variant="outlined"
              label="Symptoms/tell us more"
              defaultValue={items.details}
              name="details"
              onChange={(event) => handleChange(event)}
            />
          </div>

          <button
            onClick={handleAppointment}
            className="btn bg-bg-primary text-text-white border-none mt-4 hover:bg-green-900 w-full"
          >
            Done
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
