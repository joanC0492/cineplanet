import React from "react";

const dulceriaContext = React.createContext();

const useDulceria = () => {
  const context = React.useContext(dulceriaContext);
  if (!context) throw new Error("No hay dulceria Provider");
  return context;
};

function DulceriaProvider({ children }) {
  const [total, setTotal] = React.useState(0);

  return (
    <dulceriaContext.Provider value={{ total, setTotal }}>
      {children}
    </dulceriaContext.Provider>
  );
}

export { DulceriaProvider, useDulceria };