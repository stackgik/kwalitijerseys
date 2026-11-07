"use client";

import { ReactNode, useState } from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";
import CartPersistence from "./CartPersistence";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
    </Provider>
  );
};

export default StoreProvider;
