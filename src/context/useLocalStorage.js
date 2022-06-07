import React from "react";

function useLocalStorage(itemName, itemValue) {
  const [item, setItem] = React.useState(itemValue);

  React.useEffect(() => {
    try {
      const itemLocalStorage = localStorage.getItem(itemName);
      let aux;
      if (!!itemLocalStorage) {
        aux = JSON.parse(itemLocalStorage);
      } else {
        aux = itemValue;
        localStorage.setItem(itemName, JSON.stringify(aux));
      }
      setItem(aux);
    } catch (e) {
      console.log("e.message", e.message);
    }
  }, []);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, saveItem];
}

export { useLocalStorage };
