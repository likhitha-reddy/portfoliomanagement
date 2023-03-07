import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase_data";
import { SHA256 } from "crypto-js";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signIn = async (event) => {
    setPassword(SHA256(event.target.value).toString());
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
          alert("login successful");
          // ...
        }
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
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

          <button
            type="button"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            onClick={signIn}
          >
            Sign in
          </button>
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
