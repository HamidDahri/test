import React ,{useReducer} from "react";
import AlertContext from './alertContext';
import AlertReducer from './alertReducers';
import { SET_ALERT , REMOVE_ALERT} from '../types'
const uuid = require('uuid')

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer , initialState)

   //set alert
   const setAlert = (msg , type) => {
       const id = uuid.v4();
       dispatch({
           type: SET_ALERT, 
           payload: {msg, type ,id}
       })

       setTimeout(() => {
           dispatch({
               type: REMOVE_ALERT,
               payload: id
           })
       }, 2000 );
   }
   //remove alert 

    return(
        <AlertContext.Provider
        value={{
          alerts: state,
          setAlert
        }}>
         {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;