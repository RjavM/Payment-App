import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { Send } from "./pages/SendMoney"
import { Signup } from "./pages/Signup";
import { LandingPage } from "./pages/LandingPage";

function App() {

  return (
    <>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/Dashboard" element={<Dashboard />}></Route>
            <Route path="/Send" element={<Send />}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
