"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AuthModalContextProp = {
  isModalOpen: boolean;
  redirectUrl: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setRedirectUrl: Dispatch<SetStateAction<string>>;
};

const AuthModalContext = createContext<AuthModalContextProp | undefined>(
  undefined,
);

const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  return (
    <AuthModalContext.Provider
      value={{ isModalOpen, setIsModalOpen, redirectUrl, setRedirectUrl }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx)
    throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
};

export default AuthModalProvider;
