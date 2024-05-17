import { createContext, useContext, useState } from "react";

const GoalCalculationContext = createContext();

function GoalCalculationContextProvider({ children }) {
  const [data, setData] = useState({});
  const [isNavigate, setIsNavigate] = useState(false);

  return (
    <GoalCalculationContext.Provider
      value={{ data, setData, isNavigate, setIsNavigate }}
    >
      {children}
    </GoalCalculationContext.Provider>
  );
}

function useGoalCalculator() {
  const context = useContext(GoalCalculationContext);
  if (context === undefined)
    throw new Error(
      "GoalCalculationContext was use outside the GoalCalculationContextProvider"
    );
  return context;
}

export { GoalCalculationContextProvider, useGoalCalculator };
