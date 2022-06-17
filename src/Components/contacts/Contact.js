import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import { ContactItem } from './ContactItem';
import { Spinner } from '../Layouts/Spinner';

 const Contact = () => {
    const contactcontext = useContext(ContactContext);
    const {contacts ,getcontacts, loading , filtered} = contactcontext;

    console.log(filtered , "hamid");

    useEffect(() => {
      getcontacts();
       //eslint-disable-next-line
    }, [])
    
    if(contacts !== null && contacts.length === 0){
      return <h4>Please use the form to add a contact.</h4> 
    }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <Fragment>
          {filtered !== null ? 
         filtered.map(contact => (
          <ContactItem key={contact.id} contact={contact}></ContactItem>
        )) : 
       contacts.map(contact => (
         <ContactItem key={contact.id} contact={contact}></ContactItem>
       ))
     }
        </Fragment>
      ) : <Spinner/>}
    </Fragment>
  )
}

export default Contact
