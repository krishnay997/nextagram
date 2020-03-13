import React,{useState} from 'react';
import './App.css';
import HomePage from './pages/Homepage';
import UserProfilePage from './pages/UserProfilePage';
import { Route, Link } from "react-router-dom";
import Navbar from "./components/Navibar";
import { ToastContainer } from 'react-toastify';
import MyProfilePage from "./pages/MyProfilePage";
import UploadPage from "./pages/UploadPage"
function App() {
  
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") !== null
  )  
  return (
    <div className="App">
      <Navbar/>
      <Route exact path="/" component={HomePage} />
      <Route path="/users/:id" component={UserProfilePage} />
      <Route exact path="/profile" component={MyProfilePage} />
      <Route exact path="/upload" component={UploadPage} />


      <ToastContainer zIndex= "100"/>
    </div>
  );
    
}

export default App;




//FIX ERROR WHEN GOING TO /profile when logged out