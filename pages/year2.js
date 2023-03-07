import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "./firebase_data";
import { fetchUser } from "./fetchDetails";
import { onValue, ref, serverTimestamp, set, update } from "firebase/database";

const Year2 = () => {
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
  const [y2_, setY2_] = useState(false);

  let [inc, setInc] = useState({
    A: 5,
    B: -6,
    C: 9,
    D: 10,
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = fetchUser();
    setUser(userInfo);
  
    setInterval(() => {
      const countdownDate1 = new Date(
        "Mar 7, 2023 22:04:00 GMT+0530"
      ).getTime();
      let now = new Date().getTime();
      if (now >= countdownDate1) {
        router.push("year3");
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
      setY2_(records[11]);

    });
  });

  const uid = user;

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
    }
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

  const handleCheck = (event) => {
    event.preventDefault();
    if (!y2_) {
      let name = event.target.name;
      let value = event.target.value;
      let Aeval = Math.round(((allValues.A * (100 + inc.A)) / 100) * 100) / 100;
      let Beval = Math.round(((allValues.B* (100 + inc.B)) / 100) * 100) / 100;
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
        let esum=Math.round((Aeval+Beval+Ceval+Deval) * 100) / 100;
        try {
          const postListRef2 = ref(db, "users/" + uid + "/year2");
          set(postListRef2, {
            Aeval,
            Beval,
            Ceval,
            Deval,
            total_amount: esum,
            timestamp: serverTimestamp(),
          });
          const postListRef = ref(db, "users/" + uid);
          update(
            postListRef,
            {
              Aeval,
              Beval,
              Ceval,
              Deval,
              total_amount: esum,
              timestamp: serverTimestamp(),
              y2: true,
            },
            uid
          );

          setIssub(true);
          setY2_(true);
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
          Year 2
        </h2>

        <h4 className="inline-block px-4 py-3 bg-white rounded-lg my-2 items-center text-center shadow-md">
          Your Capital
          <br />
          <span className="font-bold text-xl">{allValues.hold}</span>
        </h4>

        <p className="text-lg font-light text-center my-1 text-slate-600">
          Divide your capital among the 4 asset classes
        </p>
        <button
          onClick={startYear}
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg my-3"
        >
          Start year
        </button>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-center gap-3">
            <div className="flex flex-col bg-white items-center font-bold text-lg px-4 py-8 rounded-lg shadow-md gap-3">
              Equities
              <p className="font-light text-sm text-center">
                An equity investment is money that is invested in a company by
                purchasing shares of that company in the stock market
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
              <p className="font-light text-sm text-center">
                A bond is a fixed-income investment that represents a loan made
                by an investor to a borrower, ususally corporate or
                governmental.
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
              <p className="font-light text-sm text-center">
                A cryptocurrency, crypto-currency, or crypto is a digital
                currency designed to work as a medium of exchange through a
                computer network that is not reliant on any central authority,
                such as a government or bank, to uphold or maintain it.
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
              <p className="font-light text-sm text-center">
                A commodity is a basic good used in commerce that is
                interchangeable with other goods of the same type. Commodities
                are most often used as inputs in the production of other goods
                or services.
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
        <button
          onClick={handleCheck}
          className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg my-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Year2;

/*
<div>
      <h1>YEAR 1</h1>
      <h1>AMOUNT AT THE START OF THIS YEAR-{allValues.hold}</h1>
      <form>
        <div>
          <input
            type="text"
            placeholder="Enter the value for ASSET A"
            onChange={handleChange}
            name="A"
          />
          <h1>ASSET A: {A__}</h1>
          <br />
          <input
            type="text"
            placeholder="Enter the value for ASSET B"
            onChange={handleChange}
            name="B"
          />
          <h1>ASSET B: {B__}</h1>
          <br />
          <input
            type="text"
            placeholder="Enter the value for ASSET C"
            onChange={handleChange}
            name="C"
          />
          <h1>ASSET C: {C__}</h1>
          <br />
          <input
            type="text"
            placeholder="Enter the value for ASSET D"
            onChange={handleChange}
            name="D"
          />
          <h1>ASSET D:   </h1>
          <br />
        </div>
        <h1>
          <button onClick={handleCheck}>SUBMIT</button>
          <button onClick={startYear}>Start year</button>
        </h1>
      </form>
    </div>
 */
