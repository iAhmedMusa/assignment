"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function TestServer() {
  const [message, setMesage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    api
      .get("/")
      .then(({ status }) => {
        if (status !== 200) {
          setErrorMessage("Server not connected");
        } else {
          setMesage("Server connected");
        }
      })
      .catch(() => setErrorMessage("Server not connected"));
  }, []);

  return (
    <div className="w-full h-[100vh] text-2xl text-center pt-16">
      <p className={message ? "text-green-600" : "text-red-600"}>{message || errorMessage}</p>
    </div>
  );
}
