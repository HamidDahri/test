import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext'
import  { useNavigate } from 'react-router-dom'
export const Login = () => {

    let navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user , setuser] = useState({
        email: "",
        password: "",
    });

    const {email , password} = user;
    
    const {setAlert} = alertContext;
   const {login ,error,clearErrors,isAuthenticated, loadUser} = authContext;

    const onchange = e =>  setuser({...user , [e.target.name]: e.target.value})
    
    const onsubmit = e => {
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert("Please fill the login form" , 'danger')
        } else 
        {
            login({email, password});
        }
    }

   useEffect(() => {
    if(isAuthenticated){
        navigate('/');
    }

    if(error !== null) {
        setAlert(error , 'danger')
        clearErrors();
    }

    //eslint-disable-next-line
   },[error , isAuthenticated])

  return (
    <div className='form-container'>
            <h1>User Login</h1>
            <form onSubmit={onsubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name="email" value={email} onChange={onchange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='text' name="password" value={password} onChange={onchange}></input>
                </div>
                <input type='submit' value='login' className='btn btn-primary btn-block'></input>
            </form>
    </div>
  )
}
