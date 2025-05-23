import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPanel from "./pages/Home/index";
import NoPage from "./pages/NoPage/index";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SalaryViewer from "./pages/Salary";
import SalaryExplorer from "./pages/Explorer";
import AllSalary from "./pages/All";
import BenchmarkDetails from "./pages/Benchmark";

function App() {
  const location = useLocation();
  return (
    <div className="font-sans bg-gradient-to-r from-blue-50 to-white">
      <div>
        {location.pathname === "/login" ||
          (location.pathname === "/register" ? <></> : <Header />)}
        {/* <div>
          {location.pathname === "/login" ||
            (location.pathname === "/register" ? <></> : <SpecificHeader />)}
        </div> */}
        <Routes>
          {/* <PrivateRoute path="/" component={MainPanel} /> */}
          <Route path="/" element={<MainPanel />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/submit-salary" element={<SalaryViewer />} />
          <Route path="/salaries" element={<SalaryExplorer />} />
          <Route path="/all-salaries" element={<AllSalary />} />
          <Route
            path="/benchmark-residency-salaries-2025"
            element={<BenchmarkDetails />}
          />
        </Routes>
        {location.pathname === "/login" ||
          (location.pathname === "/register" ? "" : <Footer />)}
      </div>
    </div>
  );
}

export default App;
