import React, { Fragment } from 'react'
import './App.css';
import {Routes , Route , BrowserRouter as Router} from 'react-router-dom'
import { Navbar } from './Components/Layouts/Navbar';
import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/authState';
import { Register } from './Components/auth/Register';
import { Login } from './Components/auth/Login';
import AlertState from './context/alert/alertState';
import { Alerts } from './Components/Layouts/Alerts';
import setAuthToken from './utils/setAuthToken';
import { ProtectedRoute } from './Components/routing/ProtectedRoute';
const  App = () =>  {

  if(localStorage.token) {
    setAuthToken(localStorage.token)
}
  return (
   <AlertState>
     <AuthState>
    <ContactState>
    <Router>
      <Fragment>
       <Navbar></Navbar>
       <div className='container'>
         <Alerts></Alerts>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>}></Route>
          {/* <Route exact path='/' element={<Home></Home>}></Route> */}
          <Route exact path='/about' element={<About/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
        </Routes>
       </div>
     </Fragment>
    </Router>
    </ContactState> 
   </AuthState>
   </AlertState>
    );
}

export default App;
