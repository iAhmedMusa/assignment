"use client";

import { useEffect, useState } from "react";
import { useAuthToken } from "@/context-api/context-provider";

import SchedulesCalender from "@/components/schedules/schedules";
import SchedulesWeekly from "@/components/schedules/schedules-weekly";
import SchedulesModal from "@/components/schedules/schedules-modal";

import api from "@/lib/api";

export default function SschedulesPage(): JSX.Element {
  const { decodedToken } = useAuthToken();
  const [schedules, setSchedules] = useState();
  const [isSchedulesChanged, setIsSchedulesChanged] = useState(false);

  useEffect(() => {
    if (!!decodedToken) {
      api.get(`doctors/${decodedToken?.doctor}`).then(({ data, status }) => {
        if (status !== 200) {
          console.log(data);
        } else {
          setSchedules(data.schedule);
        }
      });
    }
  }, [decodedToken, decodedToken?.doctor, isSchedulesChanged]);

  return (
    <>
      {decodedToken && (
        <div className="w-full max-w-[1500px] m-auto">
          {/* set schedule */}
          <div className="pb-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window !== undefined) {
                  (window as any).schedulesModal.showModal();
                }
              }}
              className="bg-bg-primary text-bg-white px-4 py-3 rounded-lg"
            >
              {`${schedules == null ? "Set Schedules" : "Update Schedule"}`}
            </button>
          </div>

          {/* schedule history */}
          <div className="flex flex-col lg:flex-row justify-start lg:gap-x-8 xl:gap-x-8 2xl:gap-x-48">
            <SchedulesCalender schedules={schedules} />
            <SchedulesWeekly schedules={schedules} />
          </div>

          <SchedulesModal
            schedules={schedules}
            isSchedulesChanged={isSchedulesChanged}
            setIsSchedulesChanged={setIsSchedulesChanged}
          />
        </div>
      )}
    </>
  );
}
