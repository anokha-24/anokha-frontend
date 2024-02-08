"use client";

import Navbar from "@/app/components/EventHeader";
import Footer from "@/app/components/Footer";

import { hashPassword } from "@/app/_util/hash";
import { useEffect, useState, useRef } from "react";
import { REGISTER_URL } from "@/app/_util/constants";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import WebGLApp from "@/app/bg/WebGLApp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import validator from "validator";

import Background from "@/app/components/user/Background";
import anokhalogo from "@/../public/images/anokha_circle.svg";

export default function Register() {
  useEffect(() => {
    secureLocalStorage.clear();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeCity, setCollegeCity] = useState("");
  const [isAmrita, setisAmrita] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = (e) => {
    setisAmrita(e.target.checked);
    setCollegeName(e.target.checked ? "Amrita Vishwa Vidyapeetham" : "");
    if (e.target.checked) {
      console.log(e);
    } else {
      console.log("Checkbox is unchecked");
    }
  };

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log({
      studentFullName: name, // Max 255 chars. Min 1 char.
      studentEmail: email, // Valid Email. Max 255 chars.
      studentPhone: phone, // 10-digit exactly.
      studentPassword: hashPassword(password), // min 8 chars. Cannot include '-'(hiphen) and "'"(quotes) as part of the password. SHA256 hashed version.
      studentCollegeName: collegeName, // Max 255 chars. Min 1 char.
      studentCollegeCity: collegeCity,
    });
    let allValid = 1;
    // add toast messages unique to each of this if
    if (name == "" || name == undefined || !validator.isAlpha(name)) {
      allValid = 0;
    }
    if (phone == "" || phone == undefined || !validator.isMobilePhone(phone)) {
      allValid = 0;
    }
    if (password == "" || password == undefined || password.length < 8) {
      allValid = 0;
    }
    if (
      collegeName == "" ||
      collegeName == undefined ||
      !validator.isAlpha(collegeName)
    ) {
      allValid = 0;
    }
    if (
      collegeCity == "" ||
      collegeCity == undefined ||
      !validator.isAlpha(collegeCity)
    ) {
      allValid = 0;
    }
    if (isAmrita == 0) {
      if (email == "" || email == undefined || !validator.isEmail(email)){
        allValid = 0;
      }
    } else if (isAmrita == 1) {
      if (
        email == "" ||
        email == undefined ||
        !email.endsWith("cb.students.amrita.edu")
      ){
        allValid = 0;
      }
    }
    if (allValid == 1) {
      try {
        const response = await fetch(REGISTER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentFullName: name,
            studentEmail: email,
            studentPhone: phone,
            studentPassword: hashPassword(password),
            studentCollegeName: collegeName,
            studentCollegeCity: "Coimbatore",
          }),
        });

        const data = await response.json();
        if (response.status === 200) {
          alert("Registration Successful");
          console.log(data);
          secureLocalStorage.setItem("registerToken", data["SECRET_TOKEN"]);
          secureLocalStorage.setItem("registerEmail", email);

          setTimeout(() => {
            router.replace("/register/verify");
          }, 500);
        } else if (response.status === 500) {
          alertError("Oops!", "Something went wrong! Please try again later!");
        } else if (data.message !== undefined || data.message !== null) {
          alertError("Registration Failed", data.message);
        } else {
          alertError("Oops!", "Something went wrong! Please try again later!");
        }
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    }
  };

  const [webGLColors, setWebGLColors] = useState({
    color1: [43 / 255, 30 / 255, 56 / 255],
    color2: [11 / 255, 38 / 255, 59 / 255],
    color3: [15 / 255, 21 / 255, 39 / 255],
  });

  const RegisterFame = useRef(null);
  const Logo = useRef(null);
  const Heading = useRef(null);
  const Register = useRef(null);
  const Form = useRef(null);

  useGSAP(() => {
    let tl = new gsap.timeline();
    tl.from(RegisterFame.current, { opacity: 0, duration: 1 });
    tl.from(
      Logo.current,
      { opacity: 0, rotation: -360, duration: 0.3 },
      "start"
    );
    tl.from(Heading.current, { opacity: 0, y: -30, duration: 0.3 }, "start");
    tl.from(Form.current, { opacity: 0, duration: 0.3 });
    tl.from("#Fields", { opacity: 0, stagger: 0.1, duration: 0.3 });
    tl.from(Register.current, { opacity: 0, y: 20, duration: 0.3 });
    tl.from("#Others", { opacity: 0, duration: 0.3 });
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <WebGLApp colors={webGLColors} />

      <div className="block space-y-24 md:space-y-10">
        <Navbar />
        <div className="relative min-h-screen">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 ">
            <div className="w-full rounded-md bg-clip-padding backdrop-blur-xl bg-opacity-80 md:-top-2 lg:w-3/4 xl:p-0 bg-white">
              <Image
                src={anokhalogo}
                priority
                alt="Amrita logo"
                width={128}
                height={128}
                className="ml-auto mr-auto mt-4 h-16"
              />
              <div className="w-full flex flex-col justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl mx-auto top-10 font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Register
                </h1>
                <form
                  className="space-y-4 md:space-y-6 flex flex-col md:flex-row md:gap-10 justify-center"
                  onSubmit={handleSignUp}
                >
                  <div className="flex flex-col justify-center flex-1 space-y-5 md:border-r md:border-black md:pr-10 max-w-600">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        name="name"
                        id="name"
                        className="bg-transparent border border-gray-800 text-black sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Phone Number
                      </label>
                      <input
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-transparent border border-gray-800 text-black sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5"
                        placeholder="+91 99999 99999"
                        required
                      />
                    </div>
                    <div>
                      <div>
                        <label
                          htmlFor="college"
                          className="block mb-2 text-sm font-medium text-black"
                        >
                          College Name
                        </label>
                        <input
                          onChange={(e) => {
                            setCollegeName(e.target.value);
                          }}
                          type="text"
                          name="college"
                          id="college"
                          value={collegeName}
                          className="bg-transparent border border-gray-800 text-black sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5"
                          placeholder="College Name"
                          disabled={isAmrita}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="collegeCity"
                          className="block mb-2 text-sm mt-5 font-medium text-black"
                        >
                          College City
                        </label>
                        <input
                          onChange={(e) => {
                            setCollegeCity(e.target.value);
                          }}
                          type="text"
                          name="collegeCity"
                          id="collegeCity"
                          value={collegeCity}
                          className="bg-transparent border border-gray-800 text-black sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5"
                          placeholder="City Name"
                          required
                        />
                      </div>
                      <div className="flex items-center mb-4 mt-6">
                        <input
                          checked={isAmrita}
                          onChange={(e) => {
                            handleCheckboxChange(e);
                          }}
                          type="checkbox"
                          name="amrita-student"
                          id="amrita-student"
                          className="mr-2"
                        />
                        <label
                          htmlFor="amrita-student"
                          className="text-sm font-medium text-black"
                        >
                          Amrita Student?
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 space-y-5 ">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Your Email
                      </label>
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        type="email"
                        name="email"
                        id="email"
                        className=" bg-transparent border border-gray-800 text-black sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5"
                        placeholder="eon@anokha.amrita.edu"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Password
                      </label>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className=" border bg-transparent border-gray-800 text-black sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="conf-password"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Confirm Password
                      </label>
                      <input
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        type="password"
                        name="conf-password"
                        id="conf-password"
                        placeholder="••••••••"
                        className=" border bg-transparent border-gray-800 text-black sm:text-sm rounded-lg focus:ring-primary-800 focus:border-primary-800 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-[200px] text-black bg-[#f69c18] mb-2 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        Sign Up
                      </button>
                      <p className="text-sm font-light text-[#ed1d21]">
                        Already have an account?{" "}
                        <a
                          href="/login"
                          className="font-medium text-primary-500 hover:underline"
                        >
                          Sign in
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}