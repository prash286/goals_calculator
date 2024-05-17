import { GoalCalculationContextProvider } from "./context/goalCalculationContext";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <GoalCalculationContextProvider>
      <main id="mainContainer">
        <AppLayout />
      </main>
    </GoalCalculationContextProvider>
  );
}

export default App;
