import React, { useContext, useState  , useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { CLEAR_ERROR } from '../../context/types';
import  { useNavigate } from 'react-router-dom'

export const Register = (props) => {

    const alertContext = useContext(AlertContext);
    const   authContext = useContext(AuthContext);

     const {register ,isAuthenticated ,clearErrors, error} = authContext

    const {setAlert} = alertContext;
    let navigate = useNavigate();

    useEffect( () => {
        if(isAuthenticated){
            navigate('/');
        }

        if(error !== null) {
            setAlert(error , 'danger')
            clearErrors();
        }

        //eslint-disable-next-line
    },[error , isAuthenticated])

    const [user , setuser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const {name , email , password , password2} = user;

    const onchange = e =>  setuser({...user , [e.target.name]: e.target.value})
    
    const onSubmit = e => {
        console.log("hamid");
        e.preventDefault();
        if(name === '' || email === '' || password === ''){
            setAlert('please enter all fields', 'danger')
        } else if (password !== password2 ) {
            setAlert('password and confirm password do not match' , 'danger')
        }else {
             register( {
                 name , email , password
             })
        } 
    }

  return (
    <div className='form-container'>
            <h1>User Registration</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name="name" value={name} onChange={onchange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name="email" value={email} onChange={onchange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='text' name="password" minLength='6' value={password} onChange={onchange}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='text' name="password2" minLength='6' value={password2} onChange={onchange}></input>
                </div>
                <input type='submit' value='register' className='btn btn-primary btn-block'></input>
            </form>
    </div>
  )
}
