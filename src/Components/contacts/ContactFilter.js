import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../../context/contact/contactContext'

export const ContactFilter = () => {

    const contactContext = useContext(ContactContext);

    const {filterContacts , filtered , clearFilter} = contactContext;
    
    const text = useRef('')

    useEffect(() => {
        if(filtered === null ){
            text.current.value = '';
        }
    })

    const onchange = e => {
    if(text.current.value !== ''){
         filterContacts(e.target.value);
    }else 
      {
          clearFilter()
      }
    }

  return (
    <form>
        <input ref={text} type="text" placeholder='Search Contact' onChange={onchange}></input>
    </form>
  )
}
