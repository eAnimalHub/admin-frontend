import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSnackbar } from 'notistack';

const PGIModeContext = React.createContext();

export const usePGIMode = () => useContext(PGIModeContext);
export function ContextPGIMode({ children }) {
  /* ------------------------------------------------------
  ------------------| States |--------------------
  ------------------------------------------------------- */
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  const [mode, setMode] = React.useState(false);

  /* ------------------------------------------------------
  ------------------/ Hooks Functions /--------------------
  ------------------------------------------------------- */

  const handleChangeMode = (value) => {
    console.log(value, "change mode");
    setMode(value);
  };

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  const collection = {
    mode,
    handleChangeMode,
  };
  return (
    <PGIModeContext.Provider value={collection}>
      {children}
    </PGIModeContext.Provider>
  );
}
