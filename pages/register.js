import { ref, serverTimestamp, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { app, db } from "../firebase_data";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { SHA256 } from "crypto-js";

const Register = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {}, []);
  const uid = user;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [roll, setRoll] = useState("");

  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log("user", res.UserCredentialImpl);
      let encryption = SHA256(password).toString();
      const postListRef = ref(db, "users/" + res.user.uid);
      set(postListRef, {
        name,
        email,
        phoneNo,
        roll,
        Aeval: 0,
        Beval: 0,
        Ceval: 0,
        Deval: 0,
        total_amount: 100000,

        password: encryption,
        timestamp: serverTimestamp(),
        y1: false,
        y2: false,
        y3: false,
        y4: false,
        y5: false,
      });
      router.replace("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-slate-200 ">
      <div className="container mx-auto min-h-screen flex flex-col justify-center max-w-xl">
        <h1 className="text-6xl font-bold text-center my-4 uppercase">
          Portfolio Ventures
        </h1>
        <h2 className="text-lg font-light text-center my-4 text-slate-600">
          Register here
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="rounded-lg border-transparent appearance-none border border-gray-300 w-xl py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required={true}
          />

          <input
            type="text"
            className="rounded-lg border-transparent appearance-none border border-gray-300 w-xl py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Roll Number"
            onChange={(e) => setRoll(e.target.value)}
            required={true}
          />

          <input
            type="tel"
            className="rounded-lg border-transparent appearance-none border border-gray-300 w-xl py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNo(e.target.value)}
            required={true}
          />

          <hr />

          <input
            type="email"
            className="rounded-lg border-transparent appearance-none border border-gray-300 w-xl py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Email ID"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />

          <input
            type="password"
            className="rounded-lg border-transparent appearance-none border border-gray-300 w-xl py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />

          <button
            type="button"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
