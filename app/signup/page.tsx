"use client";

import { Button } from "@/app/components/Button";
import InputBox from "@/app/components/InputBox";
import { Backend_URL } from "@/app/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      const res = await fetch(`${Backend_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.current.name,
          email: data.current.email,
          password: data.current.password,
        }),
      });
  
      if (!res.ok) {
        const errorResponse = await res.json(); // Parse error response
        const errorMessage = errorResponse.message || "Unknown error occurred"; // Get error message or use a default message
        throw new Error(errorMessage); // Throw error with response message
      }
  
      const response = await res.json();
      alert("User Registered!");
      console.log({ response });
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred"; // Cast error to Error type and get message
      alert(`Error: ${errorMessage}`);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          autoComplete="off"
          name="name"
          labelText="Name"
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="Password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link href={"/"}>Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
