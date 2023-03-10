import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, db } from "./firebase_data";
import { SHA256 } from "crypto-js";
import { ref, set } from "firebase/database";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [click, setClick] = useState(false);

  const signIn = async (event) => {
    setPassword(SHA256(event.target.value).toString());
    setClick(true);
    try {
      event.preventDefault();

      await signInWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCredential) => {
          // Signed in

          const user = userCredential.user;
          const { refreshToken, providerData } = user;
          console.log("login uid", user.uid);
          localStorage.setItem("userId", JSON.stringify(user.uid));

          localStorage.setItem("accessToken", JSON.stringify(refreshToken));
          

          router.replace("/Firstpage");
        }
      );
    } catch (err) {
      alert(err.message);
      router.reload();
    }
  };

  const Register = () => {
    router.replace("/register");
  };

  return (
    <div className="min-h-screen min-w-full bg-slate-200 ">
      <div className="container mx-auto min-h-screen flex flex-col justify-center max-w-2xl">
        <h1 className="text-6xl font-bold text-center my-4 uppercase">
          Portfolio Ventures
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            className="rounded-lg border-transparent appearance-none border border-gray-300 w-xl py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="rounded-lg border-transparent appearance-none border border-gray-300 w-xl py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {!click && (
            <button
              type="button"
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={signIn}
            >
              Sign in
            </button>
          )}
          {click && (
            <button
              type="button"
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg grid place-items-center"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
              </svg>
            </button>
          )}
          <p className="text-center uppercase opacity-75">Or</p>
          <button
            type="button"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            onClick={Register}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
