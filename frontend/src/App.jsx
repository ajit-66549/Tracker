import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddApplications from "./pages/add_application";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route path="login/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        ) : (
          <>
            <Route path="dashboard/" element={<Dashboard onLogout={() => setIsLoggedIn(false)} />} />
            <Route path="add-applications/" element={<AddApplications />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
