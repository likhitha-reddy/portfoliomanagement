import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "./firebase_data";
import { fetchUser } from "./fetchDetails";
import { child, get, getDatabase, onValue, ref, serverTimestamp, set, update } from "firebase/database";
import data from "./values.json";
const Year4 = () => {
  const router = useRouter();
  const [holding, setHolding] = useState(0);
  const [issub, setIssub] = useState(false);
  let [allValues, setAllValues] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    hold: 0,
  });

  const [A_, setA_] = useState(0);
  const [B_, setB_] = useState(0);
  const [C_, setC_] = useState(0);
  const [D_, setD_] = useState(0);
  const [H_, setH_] = useState(0);
  const [sy, setSy] = useState(false);

  const [A__, setA__] = useState(0);
  const [B__, setB__] = useState(0);
  const [C__, setC__] = useState(0);
  const [D__, setD__] = useState(0);
  const [y4_, setY4_] = useState(false);

  let [inc, setInc] = useState({
    A: data[3].A,
    B: data[3].B,
    C: data[3].C,
    D: data[3].D,
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = fetchUser();

    setUser(userInfo);
    if (localStorage.getItem("accessToken") !== null) {
      setInterval(() => {
        const countdownDate1 = new Date(
          "Mar 10, 2023 17:36:00 GMT+0530"
        ).getTime();
        let now = new Date().getTime();
        if (now >= countdownDate1) {
          router.replace("year5");
        }
      }, 1000);

      const dbRef = ref(db, `users/${user}`);

      let records = [];
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          records.push(childSnapshot.val());
        });
        setH_(records[10]);
        setA_(records[0]);
        setB_(records[1]);
        setC_(records[2]);
        setD_(records[3]);
        setY4_(records[14]);
      });
    } else {
      router.push("/");
    }
  });

  const uid = user;
  const [sAmount, setSAmount] = useState(0);

  const startYear = (event) => {
    event.preventDefault();

   
    if (!sy) {
      setSy(true);
      setAllValues((prevalue) => {
        return {
          ...prevalue,

          A: A_,
          B: B_,
          C: C_,
          D: D_,
          hold: H_,
        };
      });
      setA__(A_);
      setB__(B_);
      setC__(C_);
      setD__(D_);
      setHolding(H_);

      setHolding(H_);
    }
    const postListRef2 = ref(db, "users/" + uid + "/year4");
    set(postListRef2, {
     
      total_amount: H_,
     
    });
  };

  const handleChange = (event) => {
    event.preventDefault();

    if (!issub) {
      let value = event.target.value;
      let name = event.target.name;

      setAllValues((prevalue) => {
        return {
          ...prevalue,
          [name]: value,
        };
      });
    } else {
      alert("data submitted already");
    }
  };
  const reload = (event) => {
    event.preventDefault();

    router.push("Firstpage");
  };

  const handleCheck = (event) => {
    event.preventDefault();
    if (!y4_) {
      let name = event.target.name;
      let value = event.target.value;
      let Aeval = Math.round(((allValues.A * (100 + inc.A)) / 100) * 100) / 100;
      let Beval = Math.round(((allValues.B * (100 + inc.B)) / 100) * 100) / 100;
      let Ceval = Math.round(((allValues.C * (100 + inc.C)) / 100) * 100) / 100;
      let Deval = Math.round(((allValues.D * (100 + inc.D)) / 100) * 100) / 100;
      let sum =
        parseFloat(allValues.A) +
        parseFloat(allValues.B) +
        parseFloat(allValues.C) +
        parseFloat(allValues.D);

      if (sum > holding) {
        alert(
          "your invested amount is greaterthan your holding not possible please reassign"
        );
        setAllValues((prevalue) => {
          return {
            ...prevalue,
            [name]: 0,
          };
        });
      }

      if (sum < holding) {
        alert("you did not invest your entire money please reassign");
        setAllValues((prevalue) => {
          return {
            ...prevalue,
            [name]: 0,
          };
        });
      }

      if (sum == holding) {
        setAllValues((prevalue) => {
          return {
            ...prevalue,
            [name]: value,
          };
        });

        let esum = Math.round((Aeval + Beval + Ceval + Deval) * 100) / 100;

        try {
          const postListRef2 = ref(db, "users/" + uid + "/year4");
          update(postListRef2, {
            Aeval,
            Beval,
            Ceval,
            Deval,
            total_amount: esum,
            timestamp: serverTimestamp(),
            diff: esum - allValues.hold,
          },uid);
          const postListRef = ref(db, "users/" + uid);
          update(
            postListRef,
            {
              Aeval,
              Beval,
              Ceval,
              Deval,
              y4: true,
              total_amount: esum,
              timestamp: serverTimestamp(),
            },
            uid
          );

          setIssub(true);
          setY4_(true);
        } catch (err) {
          alert(err);
        }

        setAllValues((prevalue) => {
          return {
            ...prevalue,

            A: Aeval,
            B: Beval,
            C: Ceval,
            D: Deval,
          };
        });

        const inputs = document.getElementsByTagName("input['text']");
        Array.from(inputs).forEach((input) => {
          input.readOnly = true;
        });
        document.querySelector("#submit").disabled = true;
        document.querySelector("#submit").textContent =
          "Submission no more allowed";
      }
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-slate-200 ">
      <div className="container mx-auto min-h-screen flex flex-col justify-center max-w-xl items-center">
        <h1 className="text-6xl font-bold text-center my-3 uppercase">
          Portfolio Ventures
        </h1>
        <h2 className="text-2xl font-bold text-center my-1 uppercase">
          Year 4
        </h2>

        <h4 className="inline-block px-4 py-3 bg-white rounded-lg my-2 items-center text-center shadow-md">
          Your Capital
          <br />
          <span className="font-bold text-xl">{allValues.hold}</span>
        </h4>

        <p className="text-lg font-light text-center my-1 text-slate-600">
          Divide your capital among the 4 asset classes
        </p>
        {!y4_? <button
          onClick={reload}
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg my-3"
        >
          RELOAD
        </button>: null}

        {!y4_?  <button
          onClick={startYear}
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg my-3"
        >
          Start year
        </button>: null}
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-center gap-3">
            <div className="flex flex-col bg-white items-center font-bold text-lg px-4 py-8 rounded-lg shadow-md gap-3">
              Equities
              {data[2].A >= 0 ? (
                <p className="text-green-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  {data[2].A}%
                </p>
              ) : (
                <p className="text-red-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex flex-row items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {data[2].A}%
                </p>
              )}
              <p className="font-light text-sm text-center">
                An equity investment is money that is invested in a company by
                purchasing shares of that company in the stock market
                <br />
              </p>
              <input
                type="text"
                placeholder="Value"
                onChange={handleChange}
                name="A"
                className="bg-slate-200 py-2 text-center max-w-xs rounded-md font-normal font-sm shadow-sm"
              />
            </div>

            <div className="flex flex-col bg-white items-center font-bold text-lg px-4 py-8 rounded-lg shadow-md gap-3">
              Bonds
              {data[2].B >= 0 ? (
                <p className="text-green-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  {data[2].B}%
                </p>
              ) : (
                <p className="text-red-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex flex-row items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {data[2].B}%
                </p>
              )}
              <p className="font-light text-sm text-center">
                A bond is a fixed-income investment that represents a loan made
                by an investor to a borrower, ususally corporate or
                governmental.
                <br />
              </p>
              <input
                type="text"
                placeholder="Value"
                onChange={handleChange}
                name="B"
                className="bg-slate-200 py-2 text-center max-w-xs rounded-md font-normal font-sm shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-row justify-center gap-3">
            <div className="flex flex-col bg-white items-center font-bold text-lg px-4 py-8 rounded-lg shadow-md gap-3">
              Crypto
              {data[2].C >= 0 ? (
                <p className="text-green-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  {data[2].C}%
                </p>
              ) : (
                <p className="text-red-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex flex-row items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {data[2].C}%
                </p>
              )}
              <p className="font-light text-sm text-center">
                A cryptocurrency, crypto-currency, or crypto is a digital
                currency designed to work as a medium of exchange through a
                computer network that is not reliant on any central authority,
                such as a government or bank, to uphold or maintain it.
                <br />
              </p>
              <input
                type="text"
                placeholder="Value"
                onChange={handleChange}
                name="C"
                className="bg-slate-200 py-2 text-center max-w-xs rounded-md font-normal font-sm shadow-sm"
              />
            </div>

            <div className="flex flex-col bg-white items-center font-bold text-lg px-4 py-8 rounded-lg shadow-md gap-3">
              Commodities
              {data[2].D >= 0 ? (
                <p className="text-green-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                  {data[2].D}%
                </p>
              ) : (
                <p className="text-red-700 font-bold inline-block px-4 py-2 rounded-full bg-gray-100 flex flex-row items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-chevron-down"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {data[2].D}%
                </p>
              )}
              <p className="font-light text-sm text-center">
                A commodity is a basic good used in commerce that is
                interchangeable with other goods of the same type. Commodities
                are most often used as inputs in the production of other goods
                or services.
                <br />
              </p>
              <input
                type="text"
                placeholder="Value"
                onChange={handleChange}
                name="D"
                className="bg-slate-200 py-2 text-center max-w-xs rounded-md font-normal font-sm shadow-sm"
              />
            </div>
          </div>
        </div>
        {!y4_? <button
          onClick={handleCheck}
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg my-3"
          id="submit"
        >
          Submit
        </button>: <button
          
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg my-3"
          id="submit"
        >
          No more submission allowed
        </button>}
       
      </div>
    </div>
  );
};

export default Year4;
