import { createContext, useContext, useEffect, useState } from "react";

// Create a Context
const BrowserContext = createContext();

// Context Provider Component
export function BrowserProvider({ children }) {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      userAgent.includes("safari") &&
      !userAgent.includes("chrome") &&
      !userAgent.includes("android");
    setIsSafari(isSafariBrowser);
  }, []);

  return (
    <BrowserContext.Provider value={{ isSafari }}>
      {children}
    </BrowserContext.Provider>
  );
}

// Custom Hook to Access the Context
export function useBrowser() {
  return useContext(BrowserContext);
}
