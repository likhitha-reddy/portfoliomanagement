import { useState } from "react";
import "../styles/globals.css";
import GlobalContext from "./globalcontext";

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    handbudget: 2000,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    update,
  });

  function update(data) {
    setState(Object.assign({}, state, data));
  }

  return (
    <>
      <GlobalContext.Provider value={state}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
}

export default MyApp;
