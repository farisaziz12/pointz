import { useContext } from "react";
import { AppContext } from "@/app/contexts";

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
};
