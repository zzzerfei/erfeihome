import React, { createContext, useEffect, useState } from "react";
import { Language } from "@/constants/enum";

interface ILanguageContextPage {
  language: Language;
  setLanguage: (Language: Language) => void; // ?
}

interface IProps {
  children: JSX.Element;
}

export const LanguageContext = createContext<ILanguageContextPage>(
  {} as ILanguageContextPage
);

export const LanguageContextProvider = ({ children }: IProps): JSX.Element => {
  const [language, setLanguage] = useState<Language>(Language.ch);
  useEffect(() => {
    const checkLanguage = (): void => {
      const item =
        (localStorage.getItem("language") as Language) || Language.ch;
      setLanguage(item);
    };
    checkLanguage();
    window.addEventListener("storage", checkLanguage);
    return (): void => {
      window.removeEventListener("storage", checkLanguage);
    };
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: (currentLanguage): void => {
          setLanguage(currentLanguage);
          localStorage.setItem("language", currentLanguage);
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
