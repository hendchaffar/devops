// import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./login/Login";
import Signup from "./signup/Signup";
import Home from "./home/Home";
import User from "./user/User";
import Reclamation from "./reclamation/Reclamation";
import Epreclamation from "./empreclamation/Epreclamation";
import Homeemp from "./homeEmp/Homeemp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/reclamation" element={<Reclamation/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/homeemp" element={<Homeemp/>}/>
          <Route path="/users" element={<User/>}/>
          <Route path="/epreclamation" element={<Epreclamation/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;