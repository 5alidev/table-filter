import "./App.css";
import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";

function App() {
  return (
    <main className="w-full h-screen bg-gray-100">
      <SideBar />
      <Dashboard />
    </main>
  );
}

export default App;
