import React ,{useReducer} from "react";
import contactContext from './contactContext';
import contactReducer from './contactReducers';
import {ADD_CONTACT,CONTACT_ERROR,GET_CONTACTS,CLEAR_CONTACTS, DELETE_CONTACT, SET_CURRENT , CLEAR_CURRENT , UPDATE_CONTACT , FILTER_CONTACT , CLEAR_FILTER} from '../types'
import axios from "axios";

const ContactState = props => {
    const initialState = {
         contacts: null,
        current: null,
        filtered: null,
        error: null

    }

    const [state, dispatch] = useReducer(contactReducer , initialState)

    //add contact 
    const addContact = async contact => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
             const res = await axios.post('api/contacts' , contact , config)
             dispatch({
                type: ADD_CONTACT , 
                payload: res.data
            })
        } catch (error) {
            dispatch({type: CONTACT_ERROR , payload: error.response.msg })
        }
      
    }
    //GET CONTACTS

    const getcontacts = async () => {
        try {
            const res = await axios.get('api/contacts')
            dispatch({
               type: GET_CONTACTS ,
               payload: res.data
           })
       } catch (error) {
           dispatch({type: CONTACT_ERROR , payload: error.response.msg })
       }
    }
    //delete contact 
    const deleteContact = async id => {
        try {
             await axios.delete(`api/contacts/${id}`)
            dispatch({
               type: DELETE_CONTACT,
               payload: id
           })
       } catch (error) {
           dispatch({type: CONTACT_ERROR , payload: error.response.msg })
       }
    }
    //set current contact 
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT , payload: contact})
    }
    //clear current contact 
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }
    //update contact
    const updateContact = async contact => {
        const config = { 
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`api/contacts/${contact._id}` , contact , config)
            dispatch({
               type: UPDATE_CONTACT ,
               payload: res.data
           })
       } catch (error) {
           dispatch({type: CONTACT_ERROR , payload: error.response.msg })
       }
        dispatch({
            type: UPDATE_CONTACT, 
            payload: contact
        })
    }
    //filter contact
    const filterContacts = text  => {
        dispatch({
            type:FILTER_CONTACT , 
            payload: text
        })
    }
    //clear filter
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }
    //clear contacts 
    const clearcontacts = () => {
        dispatch({
            type: CLEAR_CONTACTS
        })
    }

    return(
        <contactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts ,
            clearFilter,
            getcontacts,
            clearcontacts
        }}>
         {props.children}
        </contactContext.Provider>
    )
}

export default ContactState;